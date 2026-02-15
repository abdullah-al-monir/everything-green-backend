import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "@/models/User";
import { AuthRequest, ApiResponse } from "@/types";

export const getProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
      return;
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

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
      message: "Profile fetched successfully",
      user: userResponse,
    } as ApiResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch profile";
    res.status(500).json({
      success: false,
      message,
    });
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
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

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
      return;
    }

    const { username, fullName, bio, avatar } = req.body;

    if (username) {
      const existingUser = await User.findOne({
        username,
        _id: { $ne: req.user.id },
      });

      if (existingUser) {
        res.status(400).json({
          success: false,
          message: "Username already taken",
        });
        return;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        ...(username && { username }),
        ...(fullName && { fullName }),
        ...(bio !== undefined && { bio }),
        ...(avatar && { avatar }),
      },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const userResponse = {
      id: updatedUser._id,
      email: updatedUser.email,
      username: updatedUser.username,
      fullName: updatedUser.fullName,
      bio: updatedUser.bio,
      avatar: updatedUser.avatar,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: userResponse,
    } as ApiResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update profile";
    res.status(500).json({
      success: false,
      message,
    });
  }
};

export const deleteProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
      return;
    }

    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.clearCookie("authToken");

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    } as ApiResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete profile";
    res.status(500).json({
      success: false,
      message,
    });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

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
      message: "User fetched successfully",
      user: userResponse,
    } as ApiResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch user";
    res.status(500).json({
      success: false,
      message,
    });
  }
};
