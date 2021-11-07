import mongoose from "mongoose";
const { Schema } = mongoose;

const collectionSchema = mongoose.Schema({
	name: { type: String },
	image: { type: String },
	description: { type: String },
	ownerId: { type: Schema.Types.ObjectId, ref: "user_records" },
});

const Collection = mongoose.model("collection", collectionSchema);

export default Collection;
