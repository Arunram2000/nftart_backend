import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	username: { type: String },
	email: { type: String },
	photoUrl: { type: String },
	uid: { type: String },
	balance: { type: Number, default: 100 },
});

const User = mongoose.model("user_records", userSchema);

export default User;
