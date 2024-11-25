import express from 'express';
import { Expense } from '../models/expenseModel.js';
import { Account } from '../models/accountModel.js';

const router = express.Router();

// Route to Add a new expense
export const addExpense = async (request, response) => {
  try {
    if (
        !request.body.amount ||
        !request.body.description ||
        !request.body.category ||
        !request.body.account ||
        !request.body.description 
      
    ) {
      return response.status(400).send({
        message: 'Send all required fields: username, email, password',
      });
    }
    const newExpense = {
        amount: request.body.amount,
        description: request.body.description,
        category: request.body.category,
        date: request.body.date,
        account: request.body.account,
        description: request.body.description,
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
  
  
  


export default router;