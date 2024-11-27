import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: ['Food', 'Transportation', 'Utilities', 'Entertainment', 'Others']
        },
        account: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        Month: {
            type: String,
            required: true
        }
    },
    {
        timestamps:true
    }
)


export const Expense = mongoose.model('Expense', expenseSchema);