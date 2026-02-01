import mongoose from "mongoose";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import Product from "./models/Product.js";
import User from "./models/User.js";

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
    console.log("✓ Products seeded successfully");
  } catch (error) {
    console.error("Seeding error:", error);
  }
};

const seedAdminUser = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@mewardelights.com" });
    
    if (existingAdmin) {
      console.log("✓ Admin user already exists");
      return;
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash("Admin@2026", 10);

    // Create admin user
    const adminUser = new User({
      name: "Mewar Admin",
      email: "admin@mewardelights.com",
      password: hashedPassword,
      role: "admin"
    });

    await adminUser.save();
    console.log("✓ Admin user created successfully");
    console.log("  Email: admin@mewardelights.com");
    console.log("  Password: Admin@2026");
  } catch (error) {
    console.error("Admin seeding error:", error);
  }
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding\n");

    // Run both seeding functions
    await seedProducts();
    await seedAdminUser();

    console.log("\n✓ All seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();
