const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 3001;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_uri = `mongodb+srv://darylblough:${mongodb_password}@cluster0.ruyub2l.mongodb.net/`;

async function connect() {
    try {
        await mongoose.connect(mongodb_uri);
        console.log('connected to mongodb')
    } catch (error) {
        console.error(error);
    }
}

connect();

app.get("/", (req, res) => {
    res.json({'apostles': ['mark', 'luke', 'john']});
});

app.listen(PORT, () => {console.log(`server is running on port ${PORT}`)});