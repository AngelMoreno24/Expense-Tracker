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
        !request.body.description ||
        !request.body.year ||
        !request.body.month ||
        !request.body.day 
      
    ) {
      return response.status(400).send({
        message: 'Send all required fields: username, email, password',
      });
    }
    const newExpense = {
        amount: request.body.amount,
        description: request.body.description,
        category: request.body.category,
        account: request.id,
        year: request.body.year,
        month: request.body.month,
        day: request.body.day,
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
          account, 
          year: year, 
          month: month 
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
    const { account, year } = request.body; // Extract account ID and year from the request body

    if (!account || !year) {
      return response
        .status(400)
        .send({ message: "Account ID and year are required." });
    }

    // Query expenses for the given account and year
    const expenses = await Expense.aggregate([
      {
        $match: {
          account,
          year: year, // Match the provided year
        },
      },
      {
        $group: {
          _id: { month: "$month", category: "$category" }, // Group by month and category
          totalAmount: { $sum: "$amount" }, // Calculate total amount for each category per month
          count: { $sum: 1 }, // Count the number of expenses in each category per month
        },
      },
      {
        $group: {
          _id: "$_id.month", // Group by month
          categories: {
            $push: {
              category: "$_id.category",
              totalAmount: "$totalAmount",
              count: "$count",
            },
          },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month in ascending order
      },
    ]);

    // Format the response to include all months (1–12 explicitly)
    const formattedExpenses = Array.from({ length: 12 }, (_, i) => {
      const monthString = (i + 1).toString(); // Convert month number to string (e.g., "1" for January)
      const monthData = expenses.find((expense) => expense._id === monthString);
      return {
        month: monthString, // Month as string
        categories: monthData ? monthData.categories : [], // Categories for the month or an empty array
      };
    });

    return response.status(200).json(formattedExpenses); // Send the formatted data as a response
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
};


export const getMonthOrder = async (request, response) => {
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
          account, 
          year: year, 
          month: month 
        }
      }
    ]);

    return response.status(200).json(expenses); // Send the aggregated expenses as a response
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
};


// Route to get expense info
export const deleteExpense =  async (request, response) => {
  try {
    const { id } = request.query; // Extract id from query parameters

    if (!id) {
      return response.status(400).send({ message: "Expense ID is required." });
    }

    const deleted = await Expense.deleteOne({ _id: id });
    console.log(deleted);
    return response.status(200).json(deleted);
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
};

// Route to get expense info
export const editExpense =  async (request, response) => {
  try {

    const { id } = request.body; // Extract id from query parameters

    if (!id) {
      return response.status(400).send({ message: "Expense ID is required." });
    }

    //const deleted = await Expense.deleteOne({ _id: id });


    const edited = await Expense.findById({ _id: id })

    const updatedContact = await Expense.findByIdAndUpdate(
      id,
      request.body,
      { new: true}
    );

    console.log(updatedContact);
    return response.status(200).json(updatedContact);
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
};




export default router;