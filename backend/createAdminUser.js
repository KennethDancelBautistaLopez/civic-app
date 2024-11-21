import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from './Models/User.js';

const createAdminUser = async () => {
  try {
    const email = "kenneth123@gmail.com"; // Set your admin email
    const username = "kenneth1234"; // Set your admin username
    const password = "admin12345"; // Set your admin password
    const isAdmin = true; // Set admin to true

    // Check if admin user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("Admin user already exists.");
      return;
    }

    // Hash the admin password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the admin user
    const adminUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });

    // Save the admin user
    await adminUser.save();
    console.log("Admin user created successfully.");
  } catch (err) {
    console.error("Error creating admin user:", err);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
};

// Connect to the MongoDB database and create the admin user
mongoose.connect('mongodb+srv://lopezkennethdancel02032003:eEHiSFB4xDU4ucAZ@civicengagement.n4ij2.mongodb.net/?retryWrites=true&w=majority&appName=CivicEngagement', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    createAdminUser();
  })
  .catch((err) => console.log("Database connection error:", err));
