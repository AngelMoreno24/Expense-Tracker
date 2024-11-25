import express from 'express';
import { Account } from '../models/accountModel.js';

const router = express.Router();

// Route to Add a new account
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.username ||
      !request.body.email ||
      !request.body.password
    ) {
      return response.status(400).send({
        message: 'Send all required fields: username, email, password',
      });
    }
    const newAccount = {
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
    };

    const account = await Account.create(newAccount);

    return response.status(201).send(account);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get account info
router.get('/', async (request, response) => {
  try {
    const accounts = await Account.find({});

    return response.status(200).json({
      count: accounts.length,
      data: accounts,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route to get account info
router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body; // Extract account ID from the request body

    // Query all expenses for the provided account ID
    const account = await Account.findOne({ email });

    console.log(account.email);

    if(account.password == password){

      return "Successfull Login";
    }
    return "Failed login";
    
    return response.status(200).json(account);
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

export default router;