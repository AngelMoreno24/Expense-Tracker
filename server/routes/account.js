import express from 'express';
import { Account } from '../models/accountModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // Extract account ID from the request body

    // Query all expenses for the provided account ID
    const account = await Account.findOne({ email });


    //compare password with hashed password
    if(account && (await bcrypt.compare(password, account.password))){
      const accessToken = jwt.sign({
          account: {
              username: account.username,
              email: account.email,
              id: account.id
          }
      }, process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "5m"}

    );
        res.status(200).json({ accessToken})
    }else{
        res.status(401);
        throw new Error("Invalid email or password");
    }
    res.json({ message: "Login user"});

    return {accessToken};


  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }


});

export default router;