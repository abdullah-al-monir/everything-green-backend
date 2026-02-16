import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "@/models/User";
import { generateToken } from "@/utils/jwt";
import { ApiResponse } from "@/types";
import { config } from "../config/env";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        data: errors.array(),
      });
      return;
    }

    const { email, username, fullName, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "Email or username already exists",
      });
      return;
    }

    const user = new User({
      email,
      username,
      fullName,
      password,
    });

    await user.save();

    const token = generateToken(user._id.toString(), user.email);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: "strict",
      maxAge: parseInt(config.jwtExpire || "7") * 24 * 60 * 60 * 1000,
    });

    const userResponse = {
      id: user._id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      bio: user.bio,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
      token,
    } as ApiResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Registration failed";
    res.status(500).json({
      success: false,
      message,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        data: errors.array(),
      });
      return;
    }

    const { email, password } = req.body;
    console.log(email)
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    const token = generateToken(user._id.toString(), user.email);

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: "strict",
      maxAge: parseInt(config.jwtExpire || "7") * 24 * 60 * 60 * 1000,
    });

    const userResponse = {
      id: user._id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      bio: user.bio,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse,
      token,
    } as ApiResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    res.status(500).json({
      success: false,
      message,
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Logout failed";
    res.status(500).json({
      success: false,
      message,
    });
  }
};
