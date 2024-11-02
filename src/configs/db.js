const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const dbURI = process.env.DB_URL;
        console.log(dbURI);
        await mongoose.connect(dbURI); // Loại bỏ useNewUrlParser và useUnifiedTopology
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
        process.exit(1);
    }
};

module.exports = connectDB;
