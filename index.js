import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import "./db/index.js";
import {
	userRouter,
	auctionRouter,
	collectionRouter,
	trasactionRouter,
} from "./routes/index.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/user", userRouter);
app.use("/auction", auctionRouter);
app.use("/collection", collectionRouter);
app.use("/transaction", trasactionRouter);

app.get("/", (req, res) => {
	res.send("HOMEPAGE");
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
