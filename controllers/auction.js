import { Auction, User, Collection } from "../schema/index.js";
import { addTransaction } from "./transaction.js";

export const addAuction = async (req, res) => {
	const { collectionId, ownerId, bidPrice, fees = 0.5 } = req.body;

	try {
		const collection = await Collection.findById(collectionId);

		if (!collection)
			return res.status(401).json({
				error: true,
				message: `There is no collection with this id ${collectionId}`,
			});

		const user = await User.findById(ownerId);

		if (!user)
			return res.status(401).json({ error: true, message: "invalid user" });

		if (user.balance < fees)
			return res
				.status(401)
				.json({ error: true, message: "insufficient balance" });

		const time = new Date();
		const startTime = time.getTime();
		const endTime = time.setDate(time.getDate() + 5);

		let auction = new Auction({
			name: collection.name,
			image: collection.image,
			description: collection.description,
			ownerId,
			bidPrice,
			currentBid: bidPrice,
			highestBidder: null,
			highestBidderName: null,
			startTime,
			endTime,
		});

		const result = await auction.save();

		await Collection.findByIdAndDelete(collectionId);

		await User.findByIdAndUpdate(
			ownerId,
			{ $inc: { balance: -fees } },
			{ new: false }
		);

		await addTransaction(ownerId, result._id, fees);

		res.status(201).json({ result, error: false });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "something went wrong" });
	}
};

export const bidOnAuction = async (req, res) => {
	const { id } = req.params;
	const { bidPrice, highestBidder, highestBidderName, fees = 0.25 } = req.body;

	const totalFees = bidPrice + fees;
	try {
		const data = await Auction.findById(id);

		const user = await User.findById(highestBidder);

		if (!user)
			return res.status(401).json({ error: true, message: "invalid user" });

		if (user.balance < totalFees)
			return res
				.status(401)
				.json({ error: true, message: "insufficient balance" });

		if (!data)
			return res.status(404).json({
				error: true,
				message: `There is no auction with this id ${id}`,
			});

		if (data.currentBid >= bidPrice)
			return res.status(401).json({
				error: true,
				message: "bid price must be greater than current bid",
			});

		data.currentBid = bidPrice;
		data.highestBidder = highestBidder;
		data.highestBidderName = highestBidderName;
		data.bidHistory.push({
			bidPrice,
			highestBidder,
			highestBidderName,
		});

		const updatedResult = await Auction.findByIdAndUpdate(id, data, {
			new: false,
		});

		await User.findByIdAndUpdate(
			highestBidder,
			{ $inc: { balance: -totalFees } },
			{ new: false }
		);

		await addTransaction(highestBidder, updatedResult._id, totalFees);

		res.status(201).json({ result: updatedResult, error: false });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "something went wrong" });
	}
};

export const getAuction = async (req, res) => {
	try {
		const auctionLists = await Auction.find({});

		res.status(201).json({ result: auctionLists, error: false });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "something went wrong" });
	}
};

export const getAuctionById = async (req, res) => {
	const { id } = req.params;
	try {
		const auctionList = await Auction.findById(id);

		res.status(201).json({ result: auctionList, error: false });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: true, message: "something went wrong" });
	}
};
