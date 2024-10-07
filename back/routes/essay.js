const express = require("express");
const router = express.Router();
const Essay = require("../models/Essay");

// Get all essays (only titles)
router.get("/essays", async (req, res) => {
    try {
        const essays = await Essay.find({}, "title _id"); // Include _id for the response
        res.json(essays);
    } catch (error) {
        res.status(500).json({ message: "Error finding essays" });
    }
});

// Get a specific essay by ID
router.get("/essays/:id", async (req, res) => {
    try {
        const essay = await Essay.findById(req.params.id); // Fetch by ID

        if (!essay) {
            return res.status(404).json({ message: "Essay not found!" });
        }
        res.json(essay);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong fetching the essay." });
    }
});

// Create a new essay
router.post("/essay", async (req, res) => {
    const { title, content, notes } = req.body;

    try {
        const existingEssay = await Essay.findOne({ title });

        if (existingEssay) {
            return res.status(400).json({ message: "Essay with this title already exists" });
        }

        const newEssay = new Essay({
            title,
            content,
            notes, // Default value will be used if not provided
        });

        const savedEssay = await newEssay.save();
        res.status(201).json(savedEssay);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error. Could not save essay." });
    }
});

module.exports = router;
