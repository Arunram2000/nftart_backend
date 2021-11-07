import { Transaction } from "../schema/index.js";

export const addTransaction = async (from, to, fees) => {
	try {
		return await Transaction.create({ from, to, fees });
	} catch (error) {
		console.log(error);

		return;
		// res.status(500).json({ error: true, message: "something went wrong" });
	}
};

export const getTransaction = async (req, res) => {
	try {
		const result = await Transaction.find({});

		res.json({ result, error: false });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "something went wrong" });
	}
};

export const getTransactionOfUser = async (req, res) => {
	try {
		const result = await Transaction.find({
			$or: [{ from: req.params.id }, { to: req.params.id }],
		}).sort({ createdAt: -1 });

		res.status(201).json({ result, error: false });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "something went wrong" });
	}
};

export const getTransactionById = async (req, res) => {
	try {
		const result = await Transaction.findById(req.params.id);

		res.status(201).json({ result, error: false });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "something went wrong" });
	}
};
