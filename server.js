const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db'); // Ensure this connects to your database
const authRoutes = require('./routes/authRoutes'); // Ensure this file exists
const postRoutes = require('./routes/postRoutes'); // Ensure this file exists
const commentRoutes = require('./routes/commentRoutes'); // Optional if you have this

dotenv.config();
connectDB();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); // Pass control to the next middleware
});

// Define your routes
app.use('/api/auth', authRoutes);   // Authentication routes
app.use('/api/posts', postRoutes);   // Posts routes
app.use('/api/comments', commentRoutes); // Comments routes (if applicable)

// Error handling middleware for unhandled routes
app.use((req, res, next) => {
    res.status(404).send('Sorry, that route does not exist.'); // Handle 404 errors
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!'); // General error handling
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
