import express from 'express';
import { addExpense, getExpense, getMonthlyExpenses, getYearExpenses, getMonthOrder, deleteExpense, editExpense} from "../controllers/expenseController.js";
import { verifyToken} from "../middleware/validateToken.js"
const router = express.Router();

router.post("/add", verifyToken, addExpense);

router.get("/getExpense", verifyToken, getExpense);

router.post("/getMonthlyExpenses", verifyToken, getMonthlyExpenses);

router.post("/getYearExpenses", verifyToken, getYearExpenses);

router.post("/getMonthOrder", verifyToken, getMonthOrder);

router.delete("/deleteExpense", verifyToken, deleteExpense);

router.post("/editExpense", verifyToken, editExpense);

export default router;