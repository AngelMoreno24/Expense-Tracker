import express from 'express';
import { createAccount, getAccount, loginAccount } from "../controllers/accountController.js";

const router = express.Router();

router.post("/create", createAccount);

router.post("/login", loginAccount);

router.get("/get", getAccount);


export default router;