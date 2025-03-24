const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("ws");

const app = express();
app.use(cors());

app.use(express.json()); // Middleware to parse JSON body
const betRoutes = require("./routes/bets");

const server = http.createServer(app);
const wss = new Server({ server });

let gameState = {
    roundId: new Date().toISOString(), // Use time-based ID
    status: 1,
    multiplier: 1.0,
    roundStart: true,
    isPlaneOff: false,
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

        setTimeout(() => {
            gameState.status = 3; // Animation starts
            gameState.multiplier = 1.0;
            broadcastGameState();

            let flyTime = Math.random() * 10; // Random flight duration (0-10s)
            let elapsedTime = 0;

            // Start incrementing multiplier on the backend
            const incrementInterval = setInterval(() => {
                if (elapsedTime >= flyTime) {
                    clearInterval(incrementInterval);
                    gameState.status = 4; // Plane crashes
                    gameState.isPlaneOff = true;
                    broadcastGameState();

                    setTimeout(startRound, 5000); // Restart round after 5s
                } else {
                    elapsedTime += 0.1;
                    gameState.multiplier = parseFloat((1 + elapsedTime * 0.1).toFixed(2));
                    broadcastGameState();
                }
            }, 100); // Increase multiplier every 100ms

        }, 3000); // Status 2 runs for 3 seconds
    }, 5000); // Status 1 runs for 5 seconds
};





// Broadcast game state to all connected clients
const broadcastGameState = () => {
    console.log("Broadcasting game state:", gameState); // Log game state
    wss.clients.forEach(client => {
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

app.use("/api/bets", betRoutes);



// Start the backend server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`WebSocket server started on ws://localhost:${PORT}`);
});

