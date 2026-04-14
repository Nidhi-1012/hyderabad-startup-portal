const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Simulation: Setting a default verification code
        const verificationCode = "123456";

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationCode,
            isVerified: false
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                requiresVerification: true,
                message: 'Verification code sent to your email (Simulated: 123456)'
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Robust DB Connection Check
        const isConnected = mongoose.connection && mongoose.connection.readyState === 1;

        if (isConnected) {
            try {
                const user = await User.findOne({ email });
                if (user && (await bcrypt.compare(password, user.password))) {
                    if (!user.isVerified) {
                        return res.status(200).json({
                            _id: user.id,
                            email: user.email,
                            requiresVerification: true,
                            message: 'Please verify your identity. A code has been sent to your email.'
                        });
                    }

                    return res.status(200).json({
                        _id: user.id,
                        name: user.name,
                        email: user.email,
                        token: generateToken(user._id)
                    });
                }
                // If we are here, credentials failed
                return res.status(401).json({ message: 'Invalid credentials. Please check your email and password.' });
            } catch (dbError) {
                console.error("Database query failed:", dbError.message);
                // Fall through to mock logic if query fails
            }
        }

        // FALLBACK MOCK LOGIN (Triggers if DB is offline or query fails)
        console.warn(`[AUTH] DB Offline/Error. Attempting Mock Fallback for: ${email}`);
        
        // Standard Developer Access
        if (email === 'admin@hydportal.com' && password === 'admin123') {
            return res.status(200).json({
                _id: 'mock_admin_id',
                name: 'HydPortal Admin (Offline)',
                email: 'admin@hydportal.com',
                token: generateToken('mock_admin_id'),
                isMock: true
            });
        }

        // Provide helpful feedback if they use wrong credentials in dev mode
        return res.status(401).json({ 
            message: 'Database connection lost. For development, please use: admin@hydportal.com / admin123' 
        });

    } catch (error) {
        console.error("Login Controller Critical Error:", error);
        res.status(500).json({ message: 'Internal Server Error during login', error: error.message });
    }
};

// Verify Email Code
const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mock verification: check if code is 123456 or the one stored in DB
        if (code === user.verificationCode || code === "123456") {
            user.isVerified = true;
            await user.save();

            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                message: 'Email successfully verified!'
            });
        } else {
            res.status(400).json({ message: 'Invalid verification code' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error verifying email', error: error.message });
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d'
    });
};

module.exports = {
    registerUser,
    loginUser,
    verifyEmail
};
