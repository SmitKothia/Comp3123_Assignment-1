const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes');
const employeeRoute = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/emp', employeeRoute);

// MongoDB Connection
mongoose.connect("mongodb+srv://smitkothia123:KNbeqiNcPxkgue1T@cluster0.hzzee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
