import { Router } from "express";
import { validationResult } from "express-validator";
import DB from "../db/DB.mjs";
import {validateCreateUser, validateUpdateUser, validateUserIdQuery} from "../validation/user_validation.mjs";



const userRouter = Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// GET /get-all-users
userRouter.get("/get-all-users", async (req, res) => {
    try {
        const userData = await DB.user.findMany();
        return res.status(200).json({
            msg: "User data fetched successfully",
            data: userData
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Failed to fetch user data",
            error: err.message
        });
    }
});

// GET /find-by-id
userRouter.get(
    "/find-by-id",
    validateUserIdQuery,
    handleValidationErrors,
    async (req, res) => {
        const userId = parseInt(req.query.id);
        try {
            const user = await DB.user.findUnique({
                where: { Id: userId }
            });
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }
            return res.status(200).json({
                msg: "User fetched successfully",
                data: user
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: "Failed to fetch user", error: err.message });
        }
    }
);

// POST /create-new-user
userRouter.post(
    "/create-new-user",
    validateCreateUser,
    handleValidationErrors,
    async (req, res) => {
        const userData = req.body;
        try {
            const newUser = await DB.user.create({ data: userData });
            return res.status(200).json({ newUser });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to create user." });
        }
    }
);

// PUT /update-user-by-id
userRouter.put(
    "/update-user-by-id",
    validateUpdateUser,
    handleValidationErrors,
    async (req, res) => {
        const id = parseInt(req.query.id);
        const updateData = req.body;
        try {
            const updatedUserData = await DB.user.update({
                where: { Id: id },
                data: updateData
            });
            return res.status(200).json({
                msg: "User updated successfully",
                data: updatedUserData
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                msg: "Failed to update user",
                error: err.message
            });
        }
    }
);

// DELETE /delete-by-id
userRouter.delete(
    "/delete-by-id",
    validateUserIdQuery,
    handleValidationErrors,
    async (req, res) => {
        const id = parseInt(req.query.id);
        try {
            await DB.user.delete({
                where: { Id: id }
            });
            return res.status(200).json({
                msg: `User ID ${id} deleted successfully`
            });
        } catch (err) {
            return res.status(500).json({
                msg: "Failed to delete user",
                error: err.message
            });
        }
    }
);

export default userRouter;
