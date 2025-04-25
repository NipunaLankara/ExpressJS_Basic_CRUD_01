import { Router } from "express";
import DB from "../db/DB.mjs";

const userRouter = Router();

// POST /api/v1/create-new-user
userRouter.post("/create-new-user", async (req, res) => {
    const userData = req.body;
    console.log(userData)

    try {
        const newUser = await DB.user.create({ data: userData });
        return res.status(200).json({ newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to create user." });
    }
});

export default userRouter;
