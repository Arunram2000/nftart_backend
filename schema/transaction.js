import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionSchema = mongoose.Schema(
	{
		from: { type: Schema.Types.ObjectId },
		to: { type: Schema.Types.ObjectId },
		fees: { type: Number },
	},
	{
		timestamps: true,
	}
);

const Transaction = mongoose.model("transactions", transactionSchema);

export default Transaction;
