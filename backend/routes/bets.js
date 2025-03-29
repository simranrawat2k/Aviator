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
        fs.writeFile(filePath, JSON.stringify(existingBets, null, 2), "utf8", (writeErr) => {
            if (writeErr) {
                console.error("Error writing file:", writeErr);
                return res.status(500).json({ message: "Failed to save bet data" });
            }

            console.log("Bet data saved successfully:", betData);

            // Latest data is read AFTER writing completes**
            setTimeout(() => {
                calculateTotalBetAmount(betData.roundId)
                    .then((totalBetAmount) => {
                        console.log("Total Bet Amount after saving:", totalBetAmount);
                        res.json({ message: "Bet data saved successfully", data: betData, totalBetAmount });
                    })
                    .catch((error) => {
                        console.error("Error calculating total bet amount:", error);
                        res.status(500).json({ message: "Error calculating total bet amount" });
                    });
            }, 100); // **Give a small delay to ensure file update** (100 users)
        });
    });
});

// Function to clear the JSON file
const clearBets = () => {
    fs.writeFile(filePath, JSON.stringify([]), (err) => {
        if (err) {
            console.error('Error clearing bets.json:', err);
        } else {
            console.log('bets.json has been cleared.');
        }
    });
};

// Function to calculate total bet amount
const calculateTotalBetAmount = async (xid) => {
    let totalBetAmount = 0;
    let betCount = 0;

    if (fs.existsSync(filePath)) {
        try {
            const fileContent = await fs.promises.readFile(filePath, "utf8");
            if (fileContent) {
                const betsData = JSON.parse(fileContent);


                // // Filter bets with the same roundId
                // const filteredBets = betsData.filter(bet => Number(bet.roundId) === Number(xid));
                
                // Count the number of bets
                betCount = betsData.length;


                // Sum up TotalBetValue
                totalBetAmount = betsData.reduce((sum, bet) => sum + bet.TotalBetValue, 0);
            }
        } catch (error) {
            console.error("Error reading or parsing bets data:", error);
        }
    }

    return { totalBetAmount, betCount };
};
module.exports = { router, calculateTotalBetAmount,  clearBets };

