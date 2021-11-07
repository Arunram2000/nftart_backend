import mongoose from "mongoose";

const CONNECTION_URL =
	"mongodb+srv://arunram:uQGeDceg7E2ut4Sn@cluster0.ods1q.mongodb.net/nft?retryWrites=true&w=majority";

mongoose
	.connect(CONNECTION_URL, {})
	.then((res) => console.log("mongodb connected"))
	.catch((err) => console.log(err));
