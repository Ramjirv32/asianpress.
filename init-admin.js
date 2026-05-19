const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = "mongodb+srv://Societycis:Societyforcis2025@cluster0.stegtum.mongodb.net/arp?retryWrites=true&w=majority&appName=Cluster0";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function init() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    const email = "admin@asianpress.org";
    const password = "Admin@12345";
    
    // Check if admin exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("Admin already exists. Updating password...");
      existing.passwordHash = await bcrypt.hash(password, 10);
      await existing.save();
      console.log("Password updated!");
    } else {
      console.log("Creating new admin...");
      const passwordHash = await bcrypt.hash(password, 10);
      await Admin.create({ email, passwordHash });
      console.log("Admin created!");
    }
    
    // Pre-seed some colleges to make testing easier
    const CollegeSchema = new mongoose.Schema({
      country: { type: String, required: true },
      collegeName: { type: String, required: true },
    });
    const College = mongoose.models.College || mongoose.model("College", CollegeSchema);
    
    const count = await College.countDocuments();
    if (count === 0) {
      await College.insertMany([
        { country: "India", collegeName: "Indian Institute of Technology Madras" },
        { country: "India", collegeName: "Delhi University" },
        { country: "Indonesia", collegeName: "University of Indonesia" },
        { country: "Indonesia", collegeName: "Bandung Institute of Technology" }
      ]);
      console.log("Seeded initial colleges.");
    }

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

init();
