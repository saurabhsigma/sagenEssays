const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Essay = require("./models/Essay"); // Adjust the path to your Essay model if needed

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

// Sample essays to be inserted
const sampleEssays = [
    {
        title: "The Rise of Technology",
        content: "In the 21st century, technology has changed the way we live, work, and interact with the world. It continues to evolve rapidly...",
        notes: "Explores the impact of technological advances."
    },
    {
        title: "The Power of Education",
        content: "Education is a tool that transforms lives, opens doors to opportunities, and empowers individuals to achieve their full potential...",
        notes: "Focuses on the role of education in society."
    },
    {
        title: "The Essence of Art",
        content: "Art has the unique ability to convey emotions, thoughts, and perspectives in ways that transcend language and cultural barriers...",
        notes: "Discusses the influence of art across different cultures."
    }
];

// Function to populate the database
const populateDB = async () => {
    try {
        // First, clear any existing essays to avoid duplicates
        await Essay.deleteMany();
        console.log("Existing essays removed");

        // Insert the sample essays
        await Essay.insertMany(sampleEssays);
        console.log("Sample essays inserted");
        
        // Close the database connection
        mongoose.connection.close();
    } catch (error) {
        console.error("Error populating database:", error);
        mongoose.connection.close();
    }
};

// Run the script
const runPopulate = async () => {
    await connectDB();
    await populateDB();
};

runPopulate();
