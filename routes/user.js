import express from "express";
import {
	addUser,
	transferAmount,
	getUser,
	getBiddings,
} from "../controllers/user.js";

const router = express.Router();

router.post("/add", addUser);
router.get("/get/:id", getUser);
router.get("/biddings/:id", getBiddings);
router.patch("/transfer", transferAmount);

export default router;
