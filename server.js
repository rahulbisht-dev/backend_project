import "dotenv/config"
import express from "express";
import schoolRoute from "./src/routes/schoolRoute.js";


const app = express();

// middlewares

app.use(express.json());
app.use("/" , schoolRoute);



app.listen(2000 , ()=>console.log("Server started successfully"));