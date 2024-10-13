const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// POST /signup (Create new user)
router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ message: "User created successfully.", user_id: user._id });
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST /login (User login)
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).send({ status: false, message: "Invalid Username and password" });
        }
        res.status(200).send({ message: "Login successful.", jwt_token: "Optional implementation" });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
