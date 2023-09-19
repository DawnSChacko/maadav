// Import necessary libraries/modules for your project
const http = require('http'); // For creating a web server
const fs = require('fs');     // For file system operations
const io = require('socket.io')(http); // For WebSocket communication (IoT)

// Define IoT communication with your EV charging port
io.on('connection', (socket) => {
    console.log('EV charging port connected');

    // Simulate data collection from the charging port
    setInterval(() => {
        const voltage = Math.random() * 220; // Random voltage reading
        const current = Math.random() * 30;  // Random current reading
        const data = {
            voltage,
            current,
            timestamp: new Date().toISOString()
        };
        socket.emit('chargingData', data); // Send data to the client
    }, 5000); // Simulate data every 5 seconds

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('EV charging port disconnected');
    });
});

// Create a web server to serve a web interface (dashboard, control panel, etc.)
http.createServer((req, res) => {
    // Serve your HTML/CSS/JS files here
    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end('404 Not Found');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
}).listen(3000, () => {
    console.log('Server is running on port 3000');
});

