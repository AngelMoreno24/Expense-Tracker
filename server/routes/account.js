import express from 'express';
import { Account } from '../models/accountModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// Route to Add a new account
router.post('/', async (request, response) => {
  try {

    const { email, password, username } = request.body; // Extract account ID from the request body

    if (
      !request.body.username ||
      !request.body.email ||
      !request.body.password
    ) {
      return response.status(400).send({
        message: 'Send all required fields: username, email, password',
      });
    }
    

    const accountAvailable = await Account.findOne({email});
    if(accountAvailable){
      request.status(400);
        throw new Error("email already registered");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password,10)
    console.log("Hashed password", hashedPassword)

    const newAccount = {
        username,
        email,
        password: hashedPassword,
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
      return res.status(200).json({ accessToken });
    }else{
        res.status(401);
        throw new Error("Invalid email or password");
    }

  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }


});

export default router;