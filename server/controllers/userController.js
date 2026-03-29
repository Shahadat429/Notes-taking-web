import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register : /api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all the required fields" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name: name, email: email, password: hashedPassword });

        // console.log(user);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        // console.log(token);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.json({ success: true, user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Login : /api/user/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all the required fields" });
        }
        const user = await User.findOne({ email });
        // console.log(user);
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        // console.log(token);
        res.json({ success: true, user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Logout : /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Authenticated User : /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}