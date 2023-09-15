const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // Verify the path and filename
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 3001;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_uri = `mongodb+srv://darylblough:${mongodb_password}@cluster0.ruyub2l.mongodb.net/tune-duel`;

async function connect() {
    try {
        await mongoose.connect(mongodb_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
connect();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/", async (req, res) => {
    
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'could not retrieve users'});
    }
});

app.post("/", async (req, res) => {
    try {
        const { username, score, dateTime } = req.body;
        const newUser = new User({ username, score, dateTime });
        await newUser.save();

        res.status(200).json(newUser);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.username === 1) {
            // This error is thrown when there's a duplicate key (username)
            res.status(400).json({ error: 'Username is already taken' });
        } else {
            // Handle other errors
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Could not create user' });
        }
    }
});
