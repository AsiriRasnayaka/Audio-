import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

//import route
import userRouter from "./routes/user.route.js";
import songRouter from "./routes/song.route.js";
import playlistRouter from "./routes/playlist.route.js";

const app = express();

//middleware
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

//routes path

app.use("/api/users", userRouter);
app.use("/api/songs", songRouter);
app.use("/api/playlists",playlistRouter);

export default app;