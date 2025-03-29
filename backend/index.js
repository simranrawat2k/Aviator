const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("ws");
const path = require("path");
const fs = require("fs");
const {
  router: betRoutes,
  calculateTotalBetAmount,
  clearBets,
} = require("./routes/bets");
const {
  router: currentCashout,
  clearCashout,
} = require("./routes/currentCashout");
const filePath = path.join(__dirname, "currentCashout.json");
const socketIo = require("socket.io");

const app = express();
app.use(cors());

app.use(express.json()); // Middleware to parse JSON body

const cashoutRoutes = require("./routes/cashout");

const server = http.createServer(app);
const wss = new Server({ server });
const io = socketIo(server, { cors: { origin: "*" } }); // Initialize Socket.io

let gameState = {
  roundId: new Date().toISOString(), // Use time-based ID
  status: 1,
  multiplier: 1.0,
  roundStart: true,
  isPlaneOff: false,
};

const roundPointsFile = path.join(__dirname, "roundPoints.json");

// Function to save round points to JSON file
const saveRoundPoints = (roundId, multiplier) => {
  let roundData = [];

  // Read existing data if file exists
  if (fs.existsSync(roundPointsFile)) {
    const fileContent = fs.readFileSync(roundPointsFile, "utf8");
    if (fileContent) {
      roundData = JSON.parse(fileContent);
    }
  }

  // Append new round data
  roundData.push({ roundId, multiplier });

  // Keep only the last 30 records
  if (roundData.length > 30) {
    roundData = roundData.slice(-30);
  }

  // Write updated data back to file
  fs.writeFileSync(roundPointsFile, JSON.stringify(roundData, null, 2), "utf8");

  console.log("Saved round points:", { roundId, multiplier });
};

// Function to calculate total cash amount for a given roundId
const calculateTotalCashAmount = (roundId) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading cashout.json:", err);
        return reject("Failed to read cashout data");
      }

      let existingCashouts = [];
      try {
        existingCashouts = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing cashout.json:", parseErr);
      }

      // Calculate total cash amount
      const totalCashAmount = existingCashouts.reduce((sum, entry) => {
        return sum + (entry.cashOutAmount1 || 0) + (entry.cashOutAmount2 || 0);
      }, 0);

      console.log(`Total Cash Amount for roundId ${roundId}:`, totalCashAmount); 
      resolve(totalCashAmount);
    });
  });
};

// Function to start a new round
const startRound = () => {
  gameState.roundId = Date.now(); // New round ID
  gameState.status = 1; // Loader screen (Round start)
  gameState.multiplier = 1.0;
  gameState.roundStart = true;
  gameState.isPlaneOff = false;

  broadcastGameState();

  setTimeout(() => {
    gameState.status = 2; // Pause before animation
    gameState.roundStart = false;
    broadcastGameState();

    setTimeout(async () => {
      gameState.status = 3; // Animation starts
      gameState.multiplier = 1.0;
      broadcastGameState();

      let flyTime = Math.random() * 10; // Random flight duration (0-10s)
      let elapsedTime = 0;

      // Wait for the total bet amount to be fetched
      try {
        const { totalBetAmount, betCount } = await calculateTotalBetAmount(
          gameState.roundId
        );
        console.log(
          `Total Bet Amount before increment : ${totalBetAmount}, Number of Bets before increment: ${betCount}`
        );
      } catch (error) {
        console.error("Error calculating total bet amount:", error);
      }

      // Start incrementing multiplier on the backend
      const incrementInterval = setInterval(async () => {
        if (elapsedTime >= flyTime) {
          clearInterval(incrementInterval);
          gameState.status = 4; // Plane crashes
          gameState.isPlaneOff = true;
          clearBets(); // Call the function to clear bets.json
          clearCashout();

          // Save final multiplier when the round ends
          saveRoundPoints(gameState.roundId, gameState.multiplier);

          broadcastGameState();

          setTimeout(startRound, 5000); // Restart round after 5s
        } else {
          elapsedTime += 0.1;
          gameState.multiplier = parseFloat((1 + elapsedTime * 0.1).toFixed(2));

          try {
            const totalCash = await calculateTotalCashAmount(gameState.roundId);
            console.log(
              `Round ID: ${gameState.roundId}, Total Cash: ${totalCash}`
            );

            const { totalBetAmount, betCount } = await calculateTotalBetAmount(
              gameState.roundId
            );
            console.log(`Total Bet Amount: ${totalBetAmount}`);
            console.log(`Bet Count: ${betCount}`);

            // If only one bet is placed, set flyTime to ensure a max multiplier of 1.20
            if (betCount === 1) {
              flyTime = Math.random() * 2; // till 1.2
              console.log(
                `Only one bet placed. Adjusting fly time: ${flyTime}s`
              );
            }

            // Check if totalCash is 50% or more of totalBetAmount
            if (totalBetAmount > 0 && totalCash >= totalBetAmount * 0.5) {
              console.log(
                "Cashout exceeded 50% of total bet. Plane is flying off!"
              );
              clearInterval(incrementInterval);
              gameState.status = 4; // Plane flies off
              gameState.isPlaneOff = true;
              clearBets(); // Call the function to clear bets.json
              clearCashout();

              saveRoundPoints(gameState.roundId, gameState.multiplier);
              broadcastGameState();

              setTimeout(startRound, 5000); // Restart round after 5s
              return; // Exit function early to prevent further execution
            }

            // Emit game update with total cash amount
            io.emit("gameUpdate", { roundId: gameState.roundId, totalCash });
          } catch (error) {
            console.error("Error calculating total cash amount:", error);
          }

          broadcastGameState();
        }
      }, 100); // Increase multiplier every 100ms
    }, 3000); // Status 2 runs for 3 seconds
  }, 5000); // Status 1 runs for 5 seconds
};

// Broadcast game state to all connected clients
const broadcastGameState = () => {
  console.log("Broadcasting game state:", gameState); // Log game state
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(gameState));
    }
  });
};

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("New client connected");
  ws.send(JSON.stringify(gameState));

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Start the first game round
startRound();

app.get("/", (req, res) => {
  res.send("Server is running!");
});

//API to get points history
app.get("/api/round-history", (req, res) => {
  if (fs.existsSync(roundPointsFile)) {
    const fileContent = fs.readFileSync(roundPointsFile, "utf8");
    return res.json(JSON.parse(fileContent));
  }
  res.json([]); // Return an empty array if no data exists
});

app.use("/api/bets", betRoutes);
app.use("/api/cashout", cashoutRoutes);
app.use("/api/currentCashout", currentCashout);

// Start the backend server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`WebSocket server started on ws://localhost:${PORT}`);
});
