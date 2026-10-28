const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/blood_donor_manager")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const donorSchema = new mongoose.Schema({
  donorId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  contactNumber: { type: String, required: true },
  available: { type: Boolean, default: true }
});
const Donor = mongoose.model("Donor", donorSchema, "donors");

app.get("/", (req, res) => {
  res.json({ message: "Blood Donor Manager API" });
});

// View all donors, or find donors by blood group.
app.get("/api/viewAll", async (req, res) => {
  try {
    let donors;
    if (req.query.bloodGroup) {
      donors = await Donor.find({ bloodGroup: req.query.bloodGroup });
    } else {
      donors = await Donor.find();
    }
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Find one donor using the Donor ID shown in the table.
app.get("/api/findDonor", async (req, res) => {
  try {
    if (!req.query.donorId) {
      return res.status(400).json({ message: "Enter a Donor ID" });
    }
    const donor = await Donor.findOne({ donorId: req.query.donorId });
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.json(donor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a donor.
app.post("/api/addNew", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.json({ message: "Donor registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.code === 11000 ? "Donor ID already exists" : err.message });
  }
});

// Update the donor found by its original Donor ID.
app.post("/api/updateDonor", async (req, res) => {
  try {
    const { originalDonorId, donorId, name, bloodGroup, contactNumber, available } = req.body;
    if (!originalDonorId) {
      return res.status(400).json({ message: "Enter a Donor ID" });
    }
    const donor = await Donor.findOneAndUpdate({ donorId: originalDonorId }, {
      donorId, name, bloodGroup, contactNumber, available
    });
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.json({ message: "Donor updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.code === 11000 ? "Donor ID already exists" : err.message });
  }
});

// Delete a donor using its Donor ID.
app.post("/api/deleteDonor", async (req, res) => {
  try {
    if (!req.body.donorId) {
      return res.status(400).json({ message: "Enter a Donor ID" });
    }
    const donor = await Donor.findOneAndDelete({ donorId: req.body.donorId });
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.json({ message: "Donor deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
