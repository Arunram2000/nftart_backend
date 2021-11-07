import { User, Auction } from "../schema/index.js";
import { addTransaction } from "./transaction.js";

export const addUser = async (req, res) => {
	const { username, email, photoUrl, uid } = req.body;
	try {
		const oldUser = await User.findOne({ uid });

		if (oldUser) return res.status(201).json(oldUser);

		const result = await User.create({
			username,
			email,
			photoUrl,
			uid,
		});

		res.status(201).json(result);
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: true, message: "something went wrong" });
	}
};

export const getUser = async (req, res) => {
	try {
		const result = await User.findOne({ uid: req.params.id });

		if (!result)
			return res.status(401).json({ error: true, message: "invalid user" });

		res.status(201).json(result);
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: true, message: "something went wrong" });
	}
};

export const transferAmount = async (req, res) => {
	const { from, to, amount } = req.body;
	try {
		const fromUser = await User.findById(from);
		const toUser = await User.findById(to);

		if (fromUser.balance === 0)
			return res
				.status(401)
				.json({ error: true, message: "Insufficient balance" });

		// let fromUserBalance=fromUser.balance-amount
		// let toUserBalance=toUser.balance+amount

		// fromUser.balance = fromUser.balance - amount;
		// toUser.balance = toUser.balance + amount;

		const updatedFromUser = await User.findByIdAndUpdate(
			from,
			{ $inc: { balance: -amount } },
			{
				new: false,
			}
		);
		const updatedToUser = await User.findByIdAndUpdate(
			to,
			{ $inc: { balance: amount } },
			{
				new: false,
			}
		);

		const transaction = await addTransaction(from, to, amount);

		res
			.status(201)
			.json({ error: false, updatedFromUser, updatedToUser, transaction });
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: true, message: "something went wrong" });
	}
};

export const getBiddings = async (req, res) => {
	try {
		const result = await Auction.find({
			bidHistory: { $elemMatch: { highestBidder: req.params.id } },
		});

		res.status(201).json({ result });
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: true, message: "something went wrong" });
	}
};
