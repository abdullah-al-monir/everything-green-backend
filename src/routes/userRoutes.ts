import { Router } from "express";
import { body } from "express-validator";
import * as userController from "../controllers/userController";
import { authenticate } from "../middleware/auth";

const router = Router();

const updateProfileValidation = [
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty"),
  body("bio")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Bio cannot exceed 500 characters"),
  body("avatar")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Avatar must be a valid URL"),
];

// Routes
router.get("/profile", authenticate, userController.getProfile);
router.patch(
  "/profile",
  authenticate,
  updateProfileValidation,
  userController.updateProfile,
);
router.delete("/profile", authenticate, userController.deleteProfile);
router.get("/:id", userController.getUser);

export default router;
