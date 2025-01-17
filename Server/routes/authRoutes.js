const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
// site state 
app.post('/health', (req, res) => {
  res.json({ status: true });
});


// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });

        // Generate token
        const token = generateToken(user._id);

        // Set token in cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict',
            maxAge: 24*60 * 60 * 1000, // 1 hour
        });

        res.status(201).json({ message: 'User registered successfully' ,status:true,user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' ,status:false});
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            // Generate token
            const token = generateToken(user._id);

            // Set token in cookie
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict',
                maxAge:24* 60 * 60 * 1000, // 1 hour
            });

            res.status(200).json({ message: 'Login successful',user,status:true });
        } else {
            res.status(401).json({ message: 'Invalid credentials', status:false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    // Clear the cookie
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully' , status:true});
});

module.exports = router;
