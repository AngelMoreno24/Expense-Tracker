import express from 'express';
import { addExpense, getExpense, getMonthlyExpenses } from "../controllers/expenseController.js";
import { verifyToken} from "../middleware/validateToken.js"
const router = express.Router();

router.post("/add", verifyToken, addExpense);

router.get("/getExpense", verifyToken, getExpense);

router.get("/getMonthlyExpenses", getMonthlyExpenses);

export default router;