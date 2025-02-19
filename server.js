const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dbService = require('./dbService');
const cors = require('cors'); // Import CORS middleware
const bcrypt = require('bcrypt');
require('dotenv').config();
const { generateToken } = require('./utils');

const app = express();
app.use(cors());
// Serve static files correctly
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../public/login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, '../public/signup.html')));
app.get('/logout', (req, res) => res.sendFile(path.join(__dirname, '../public/logout.html')));
app.get('/welcome', (req, res) => res.sendFile(path.join(__dirname, '../public/welcome.html')));

// Handle login request
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = dbService.getDbServiceInstance();
        const result = await db.getUserByCredentials(username);
        if (!result) return res.status(401).json({ error: "Invalid username or password" });

        const passwordMatch = await bcrypt.compare(password, result.password);
        if (!passwordMatch) return res.status(401).json({ error: "Invalid username or password" });

        const accessToken = generateToken({ username, id: result.id });
        res.json({ accessToken });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Handle signup request
app.post('/signup', async (req, res) => {
    console.log("Received signup request:", req.body);
    try {
        const { username, email, password } = req.body;
        const db = dbService.getDbServiceInstance();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await db.createUser(username, email, hashedPassword);
        console.log("Created user:", result);
        if (!result) {
            console.error("Error creating user:", err);
            return res.status(500).json({ error: "Error creating user" })};

        const accessToken = generateToken({ username, id: result.id });
        res.json({ accessToken });
    } catch (err) {
        console.error("global error:", err);
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
