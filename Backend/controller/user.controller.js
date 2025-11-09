import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Song from "../models/song.model.js";
import Playlist from "../models/playlist.model.js";



export const signup = async (req, res) => {
    try{
        //1. did i get the import
        const {name,email,password,gender} = req.body;

        //2. Did i validate input
        if (!name || !email || !password || !gender) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        //3. Did i checked permission/rules
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }
        //4. Did i do the main action
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let profileImage = "";
        if (req.file) {
            const result = await uploadToCloudinary(req.file.path, {
                folder: "profile_image",
            } 

            );
            profileImage = result.secure_url;
        }

        const user = new User ({
            name,
            email,
            password: hashedPassword,
            gender,
            profileImage,
        });
        await user.save();

        //5. Did i update anything else related
        const token = jwt.sign(
            {userID: user._id, role: user.role },
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.cookie("token",token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
        });

        //6. Did i respond the client
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                gender: user.gender,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        console.error("Signup error", error.message);
        res.status(500).json({
            success: false,
            message: "Server error during signup",
        });
    }
    
};

// Login Controller

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //find user
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            })
        }
        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        //genarate jwt
        const token = jwt.sign(
            { userID: user._id, role: user.role},
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        //set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            success:true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                gender: user.gender,
                profileImage: user.profileImage,
            },
        });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error during login",
        });
    }
};

//Logout Controller
export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        console.error("Logout error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error during logout",
        });
    }
};

//upgrade to seller controller

