const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../betsData.json");

// POST route to save bets
router.post("/", (req, res) => {
    const betData = req.body;

    // Read existing data (if file exists)
    fs.readFile(filePath, "utf8", (err, data) => {
        let existingBets = [];
        if (!err && data) {
            try {
                existingBets = JSON.parse(data);
            } catch (parseErr) {
                console.error("Error parsing existing data:", parseErr);
            }
        }

        // Append new bet data
        existingBets.push(betData);

        // Write updated data back to file
        fs.writeFile(filePath, JSON.stringify(existingBets, null, 2), (writeErr) => {
            if (writeErr) {
                console.error("Error writing file:", writeErr);
                return res.status(500).json({ message: "Failed to save bet data" });
            }
            res.json({ message: "Bet data saved successfully", data: betData });
        });
    });
});

module.exports = router;
