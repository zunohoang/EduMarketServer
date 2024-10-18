const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURI = 'mongodb://127.0.0.1:27017/edu_market';
        await mongoose.connect(dbURI); // Loại bỏ useNewUrlParser và useUnifiedTopology
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
        process.exit(1);
    }
};

module.exports = connectDB;
