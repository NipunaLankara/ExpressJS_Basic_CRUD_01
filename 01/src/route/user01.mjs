import {Router} from "express";
import {userData} from "../data/user-info.mjs";

const userRouter = Router();


// Get Methods...................................
userRouter.get("/api/v1/get-all-users",(req,res)=>{
    res.status(200).json({
        msg:"user data",
        data:userData
    });
})

// Use params ..
userRouter.get("/api/v1/user/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = userData.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User found", data: user });
});

// Use query ..
userRouter.get("/api/v1/user-by-id", (req, res) => {
    const userId = parseInt(req.query.id);

    if (isNaN(userId)) {
        return res.status(400).json({ msg: "Invalid or missing 'id' query parameter" });
    }

    const user = userData.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User found", data: user });
});



// // POST Method.......................
// userRouter.post("/api/v1/create-user", (req, res) => {
//     const { id, name } = req.body;
//
//     if (!id || !name) {
//         return res.status(400).json({ msg: "ID and name are required" });
//     }
//
//     const existing = userData.find(u => u.id === id);
//     if (existing) {
//         return res.status(409).json({ msg: "User ID already exists" });
//     }
//
//     userData.push({ id, name });
//     res.status(201).json({ msg: "User created", data: { id, name } });
// });
//
// // PUT Method....................
// userRouter.put("/api/v1/update-user/:id", (req, res) => {
//     const userId = parseInt(req.params.id);
//     const { name } = req.body;
//
//     const user = userData.find(u => u.id === userId);
//     if (!user) {
//         return res.status(404).json({ msg: "User not found" });
//     }
//
//     user.name = name || user.name;
//     res.status(200).json({ msg: "User updated", data: user });
// });
//
// // DELETE Method.....................
// userRouter.delete("/api/v1/delete-user/:id", (req, res) => {
//     const userId = parseInt(req.params.id);
//     const index = userData.findIndex(u => u.id === userId);
//
//     if (index === -1) {
//         return res.status(404).json({ msg: "User not found" });
//     }
//
//     const deletedUser = userData.splice(index, 1);
//     res.status(200).json({ msg: "User deleted", data: deletedUser[0] });
// });

export default userRouter;