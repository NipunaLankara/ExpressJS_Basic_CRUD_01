import express from "express";

const server = express();

server.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hi Express Js"
    });
});

server.get("/api/v1/get-1", (req, res) => {
    res.status(200).json({
        msg: "Hi bro"
    });
});

server.get("/api/v1/error-example", (req, res) => {
    res.status(400).json({
        error: "Bad Request"
    });
});

server.get("/api/v1/not-found", (req, res) => {
    res.status(404).json({
        error: "Not Found"
    });
});

server.get("/api/v1/check", (req, res) => {
    const authorized = false;

    if (!authorized) {
        return res.status(401).json({ error: "Unauthorized access" });
    }

    res.status(200).json({ msg: "Welcome!" });
});



const PORT = process.env.PORT || 4000;
server.listen(4000,()=>{
    console.log(`Server Started at http://127.0.0.1:${PORT}`);
});


