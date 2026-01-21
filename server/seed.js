import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding");

    // Clear existing products
    await Product.deleteMany({});

    const products = [
      {
        name: "Dal Baati Churma",
        category: "main",
        price: 299,
        image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
        description: "Traditional Mewar delicacy cooked in ghee"
      },
      {
        name: "Gatte ki Sabzi",
        category: "main",
        price: 249,
        image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        description: "Gram flour dumplings in spiced curry"
      },
      {
        name: "Pyaaz Kachori",
        category: "snacks",
        price: 99,
        image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
        description: "Crispy Jaipur-style snack"
      },
      {
        name: "Ghewar",
        category: "sweets",
        price: 199,
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
        description: "Royal Rajasthani honeycomb dessert"
      }
    ];

    await Product.insertMany(products);
    console.log("Products seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedProducts();
