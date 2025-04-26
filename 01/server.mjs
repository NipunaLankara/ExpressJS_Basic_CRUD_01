import express from "express";
import userRouter from "./src/route/user.mjs";
import productRouter from "./src/route/product.mjs";

const server = express();
server.use(express.json());

// Create a base router for versioning
const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/product", productRouter);

// Mount the versioned router at once
server.use("/api/v1", apiRouter);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server Started at http://127.0.0.1:${PORT}`);
});
