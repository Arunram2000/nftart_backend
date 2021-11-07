import express from "express";
import {
	addTransaction,
	getTransaction,
	getTransactionById,
	getTransactionOfUser,
} from "../controllers/transaction.js";

const router = express.Router();

router.post("/add", addTransaction);
router.get("/get_transaction", getTransaction);
router.get("/get_transaction/:id", getTransactionOfUser);
router.get("/get_transaction/tx/:id", getTransactionById);

export default router;
