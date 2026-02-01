import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String
      }
    ],
    deliveryAddress: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String
    },
    subtotal: {
      type: Number,
      required: true
    },
    deliveryCharge: {
      type: Number,
      default: 50
    },
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "paid", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
      index: true
    },
    paymentMethod: {
      type: String,
      enum: ["razorpay", "cod"],
      default: "razorpay"
    },
    paymentDetails: {
      orderId: String,
      paymentId: String,
      signature: String,
      paidAt: Date
    },
    notes: String,
    termsAccepted: Boolean
  },
  { timestamps: true }
);

// Create compound index for user and date queries
orderSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Order", orderSchema);
