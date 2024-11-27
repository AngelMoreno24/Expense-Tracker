import express from 'express';
import { Expense } from '../models/expenseModel.js';
import mongoose from 'mongoose';

const router = express.Router();

// Route to Add a new expense
export const addExpense = async (request, response) => {
  try {
    if (
        !request.body.amount ||
        !request.body.description ||
        !request.body.category ||
        !request.body.account ||
        !request.body.description ||
        !request.body.year ||
        !request.body.month 
      
    ) {
      return response.status(400).send({
        message: 'Send all required fields: username, email, password',
      });
    }
    const newExpense = {
        amount: request.body.amount,
        description: request.body.description,
        category: request.body.category,
        account: request.body.account,
        year: request.body.year,
        month: request.body.month,
    };

    const expense = await Expense.create(newExpense);

    return response.status(201).send(expense);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Route to get expense info
export const getAllExpenses = async (request, response) => {
  try {
    const expenses = await Expense.find({});

    return response.status(200).json({
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};


// Route to get expense info
export const getExpense =  async (request, response) => {
  try {
    const { account } = request.body; // Extract account ID from the request body

    if (!account) {
      return response.status(400).send({ message: "Account ID is required." });
    }
    //console.log(account);
    // Query all expenses for the provided account ID
    const expenses = await Expense.find({ account });

    return response.status(200).json(expenses);
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
};

export const getMonthlyExpenses = async (request, response) => {
  try {
    const { account, year, month } = request.body; // Extract account ID, year, and month from the request body

    if (!account || !year || !month) {
      return response.status(400).send({ message: "Account ID, year, and month are required." });
    }

    // Define start and end dates for the month
    const startDate = new Date(year, month - 1, 1); // Start of the month
    const endDate = new Date(year, month, 0, 23, 59, 59, 999); // End of the month

    // Query expenses for the given account and date range
    const expenses = await Expense.aggregate([
      {
        $match: {
          account, // Match the account ID
          createdAt: { $gte: startDate, $lte: endDate } // Match the date range
        }
      },
      {
        $group: {
          _id: "$category", // Group by category
          totalAmount: { $sum: "$amount" }, // Calculate total amount per category
          count: { $sum: 1 } // Count number of expenses per category
        }
      }
    ]);

    return response.status(200).json(expenses); // Send the aggregated expenses as a response
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
};


export const getYearExpenses = async (request, response) => {
  try {
    const { account, year, month } = request.body; // Extract account ID, year, and month from the request body

    if (!account || !year ) {
      return response.status(400).send({ message: "Account ID, year, and month are required." });
    }

    // Define start and end dates for the month
    const startDate = new Date(year, 1 - 1, 1); // Start of the month
    const endDate = new Date(year, 12, 0, 23, 59, 59, 999); // End of the month

    // Query expenses for the given account and date range
    const expenses = await Expense.aggregate([
      {
        $match: {
          account, // Match the account ID
          createdAt: { $gte: startDate, $lte: endDate } // Match the date range
        }
      },
      {
        $group: {
          _id: "$category", // Group by category
          totalAmount: { $sum: "$amount" }, // Calculate total amount per category
          count: { $sum: 1 } // Count number of expenses per category
        }
      }
    ]);

    return response.status(200).json(expenses); // Send the aggregated expenses as a response
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
};
export default router;