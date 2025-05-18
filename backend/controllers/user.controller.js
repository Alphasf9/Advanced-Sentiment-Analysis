import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already taken" });
        }

        const user = new User({ username, password });
        await user.save();

        const token = user.generateJWT();

        res.cookie('token', token);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = user.generateJWT();

        res.cookie('token', token);

        res.json({
            message: "Login successful",
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error("Get user profile error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
        });

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
