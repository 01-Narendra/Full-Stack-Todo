import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import todoRouter from './todo.routes.js';
import bodyParser from 'body-parser';

const app = express()

// connect databse
connectDB();

app.use(cors())
app.use(bodyParser.json())

app.get("/", (req,res) => {
    res.send("Api working")
})

// endpoint for retrieving json data
app.use("/api/v1/todo", todoRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})




