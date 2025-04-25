import express from "express";
import userRouter from "./src/route/user.mjs";

const server = express();

// Middleware first
server.use(express.json());

// Then the router
server.use("/api/v1/user",userRouter);


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server Started at http://127.0.0.1:${PORT}`);
});
