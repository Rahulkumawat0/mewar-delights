import express from "express";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";

const router = express.Router();

// 🔒 Middleware to verify token and get user
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

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

// UPDATE order status (for admin)
router.patch("/:orderId", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

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

export default router;
