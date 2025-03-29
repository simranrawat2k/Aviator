const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// path to cashout.json 
const filePath = path.join(__dirname, "..", "currentCashout.json");

// Handle cashout API request
router.post("/", (req, res) => {
    const newCashout = req.body;

    // Read existing cashouts
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading cashout.json:", err);
            return res.status(500).json({ error: "Failed to read cashout data" });
        }

        let existingCashouts = [];
        try {
            existingCashouts = JSON.parse(data);
        } catch (parseErr) {
            console.error("Error parsing cashout.json:", parseErr);
        }

        // Add new cashout data
        existingCashouts.push(newCashout);

        // Write updated data back to file
        fs.writeFile(filePath, JSON.stringify(existingCashouts, null, 2), (writeErr) => {
            if (writeErr) {
                console.error("Error writing cashout.json:", writeErr);
                return res.status(500).json({ error: "Failed to save cashout data" });
            }

            console.log("Cashout saved:", newCashout);
            res.json({ success: true, message: "Cashout recorded successfully" });
        });
    });
});

// Function to clear the JSON file
const clearCashout = () => {
    fs.writeFile(filePath, JSON.stringify([]), (err) => {
        if (err) {
            console.error('Error clearing currentCashout.json:', err);
        } else {
            console.log('currentCashout.json has been cleared.');
        }
    });
};

module.exports = {router, clearCashout};
