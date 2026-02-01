import express from "express";
import Order from "../models/Order.js";
import { verifyAdmin, verifyToken } from "../middleware/adminAuth.js";

const router = express.Router();

// GET all orders for a user
router.get("/user/:userId", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("items.product")
      .sort({ createdAt: -1 });
    
    res.status(200).json(orders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// GET single order by ID
router.get("/:orderId", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("user")
      .populate("items.product");
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.status(200).json(order);
  } catch (error) {
    console.error("GET ORDER ERROR:", error);
    res.status(500).json({ message: "Error fetching order" });
  }
});

// CREATE a new order
router.post("/", verifyToken, async (req, res) => {
  try {
    const { 
      userId, 
      items, 
      deliveryAddress, 
      subtotal, 
      deliveryCharge, 
      totalAmount,
      paymentMethod,
      termsAccepted,
      notes
    } = req.body;

    // Validate required fields
    if (!userId || !items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!termsAccepted) {
      return res.status(400).json({ message: "Please accept terms and conditions" });
    }

    // Create new order
    const order = new Order({
      user: userId,
      items,
      deliveryAddress,
      subtotal,
      deliveryCharge,
      totalAmount,
      paymentMethod,
      termsAccepted,
      notes,
      status: "pending"
    });

    const savedOrder = await order.save();
    
    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: "Error creating order" });
  }
});

// UPDATE order status (for admin) - NOW SECURED
router.patch("/:orderId", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Validate status is in allowed enum
    const validStatuses = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { 
        status,
        updatedAt: new Date()
      },
      { new: true }
    ).populate("user").populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order updated successfully",
      order
    });
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);
    res.status(500).json({ message: "Error updating order" });
  }
});

// UPDATE order payment details (after payment)
router.patch("/:orderId/payment", async (req, res) => {
  try {
    const { paymentId, signature } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        status: "paid",
        "paymentDetails.paymentId": paymentId,
        "paymentDetails.signature": signature,
        "paymentDetails.paidAt": new Date()
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Payment updated successfully",
      order
    });
  } catch (error) {
    console.error("UPDATE PAYMENT ERROR:", error);
    res.status(500).json({ message: "Error updating payment" });
  }
});

// =============== ADMIN ENDPOINTS ===============

// GET all orders (admin only) - with search and filter
router.get("/admin/all", verifyAdmin, async (req, res) => {
  try {
    const { status, search, sortBy } = req.query;
    
    let filter = {};

    // Filter by status if provided
    if (status && status !== "all") {
      filter.status = status;
    }

    // Search by order ID or customer name
    if (search) {
      const searchRegex = new RegExp(search, "i");
      
      // Try to find by order ID first
      try {
        filter._id = search;
      } catch (e) {
        // If invalid ObjectId, search by customer name
        const usersWithName = await User.find({ name: searchRegex }).select("_id");
        if (usersWithName.length > 0) {
          filter.user = { $in: usersWithName.map(u => u._id) };
        }
      }
    }

    let query = Order.find(filter)
      .populate("user", "name email phone")
      .populate("items.product", "name price");

    // Sort by most recent by default
    if (sortBy === "oldest") {
      query = query.sort({ createdAt: 1 });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const orders = await query;

    res.status(200).json({
      total: orders.length,
      orders
    });
  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// GET dashboard stats (admin only)
router.get("/admin/stats", verifyAdmin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "pending" });
    const paidOrders = await Order.countDocuments({ status: "paid" });
    const processingOrders = await Order.countDocuments({ status: "processing" });
    const shippedOrders = await Order.countDocuments({ status: "shipped" });
    const deliveredOrders = await Order.countDocuments({ status: "delivered" });
    const cancelledOrders = await Order.countDocuments({ status: "cancelled" });

    // Calculate total revenue
    const revenueData = await Order.aggregate([
      { $match: { status: { $in: ["paid", "processing", "shipped", "delivered"] } } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // Get recent orders
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      stats: {
        totalOrders,
        pendingOrders,
        paidOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
        totalRevenue
      },
      recentOrders
    });
  } catch (error) {
    console.error("GET STATS ERROR:", error);
    res.status(500).json({ message: "Error fetching statistics" });
  }
});

// GET single order detail (admin only)
router.get("/admin/:orderId", verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("user")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("GET ORDER DETAIL ERROR:", error);
    res.status(500).json({ message: "Error fetching order" });
  }
});

export default router;
