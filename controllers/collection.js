import { Collection, User } from "../schema/index.js";
import { addTransaction } from "./transaction.js";

export const addCollection = async (req, res) => {
	const { ownerId, name, image, description, fees = 0.25 } = req.body;
	try {
		const user = await User.findById(ownerId);

		if (!user)
			return res.status(401).json({ error: true, message: "invalid user" });

		if (user.balance < fees)
			return res
				.status(401)
				.json({ error: true, message: "insufficient balance" });

		const data = await Collection.create({
			ownerId,
			name,
			description,
			image,
		});

		await User.findByIdAndUpdate(
			ownerId,
			{ $inc: { balance: -fees } },
			{ new: false }
		);

		await addTransaction(ownerId, data._id, fees);

		res.status(201).json({ message: "collection added successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "something went wrong" });
	}
};

export const updateCollection = async (req, res) => {
	const { id } = req.params;
	const { ownerId, metadata, fees } = req.body;

	try {
		let updateCollection = {
			ownerId,
			metadata,
		};

		const updatedCollection = await Collection.findOneAndUpdate(
			id,
			updateCollection,
			{ new: false }
		);

		await addTransaction(ownerId, updatedCollection._id, fees);

		res.status(201).json({
			result: updatedCollection,
			message: "collection updated successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "something went wrong" });
	}
};

export const deleteCollection = async (req, res) => {
	const { id } = req.params;

	try {
		await Collection.findByIdAndDelete(id);

		res.status(201).json({ error: false, message: "deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "something went wrong" });
	}
};

export const getCollection = async (req, res) => {
	try {
		const result = await Collection.find({ ownerId: req.params.id });

		res.status(201).json({ result, error: false });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "something went wrong" });
	}
};
