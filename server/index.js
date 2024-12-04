import express from "express";
import cors from 'cors';
import mongoose from 'mongoose'
import accountRoute from './routes/account.js';
import expensesRoute from './routes/expense.js';
import dotenv from "dotenv";

dotenv.config();

const app = express()

app.use(express.json());

app.get("/api", (req, res) => {
    res.json({"users": ["a","b"]})
})

//Handle CORS policy: allow all oirigins with default of cors(*)
app.use(cors());

//refactor paths
app.use('/accounts', accountRoute);
app.use('/expenses', expensesRoute);

const port = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('App connected to database');
        app.listen(port, () => {
            console.log(`App is listening to port: ${port}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })


