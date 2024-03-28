const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Contact = require("./Schema/Contact");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://codenidhish07:GSgTKyWnOC1U7umi@cluster0.jixlhp9.mongodb.net/contacts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});


// Routes
app.post("/api/contact", async (req, res) => {
  const { name, email, mobile, message } = req.body;

  try {
    const newContact = new Contact({ name, email, mobile, message });
    await newContact.save();
    console.log("New contact saved:", newContact);
    res.status(201).json({ success: true, message: "Contact form submitted successfully." });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ success: false, error: "Failed to submit contact form." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
