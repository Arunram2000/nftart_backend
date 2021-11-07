import mongoose from "mongoose";
const { Schema } = mongoose;

const auctionSchema = mongoose.Schema(
	{
		name: { type: String },
		image: { type: String },
		description: { type: String },
		ownerId: { type: Schema.Types.ObjectId, ref: "user_records" },
		bidPrice: { type: Number },
		currentBid: { type: Number },
		highestBidder: { type: String },
		highestBidderName: { type: String },
		startTime: { type: Number },
		endTime: { type: Number },
		bidHistory: {
			type: [
				{
					bidPrice: { type: Number },
					highestBidder: { type: Schema.Types.ObjectId, ref: "user_records" },
					highestBidderName: { type: String },
				},
			],
			default: [],
		},
	},
	{ timestamps: true }
);

const Auction = mongoose.model("auction", auctionSchema);

export default Auction;
