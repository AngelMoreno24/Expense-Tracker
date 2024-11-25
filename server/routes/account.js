import express from 'express';
import { createAccount, getAccount, loginAccount } from "../controllers/accountController.js";
import { verifyToken} from "../middleware/validateToken.js"
const router = express.Router();

router.post("/create", createAccount);

router.post("/login", loginAccount);

router.get("/get", getAccount);


export default router;