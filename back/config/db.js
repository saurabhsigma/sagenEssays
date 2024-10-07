const mongoose = require("mongoose");
require('dotenv').config(); 

const mongoURI = process.env.MONGO_URI 


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true, // Optional in case you need to use MongoDB indexes
            // useFindAndModify: false // Optional, avoids deprecation warnings
        });

        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1); // Exit process with failure if connection fails
    }
};

module.exports = connectDB;