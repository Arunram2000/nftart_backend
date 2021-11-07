import express from "express";
import {
	addAuction,
	bidOnAuction,
	getAuctionById,
	getAuction,
} from "../controllers/auction.js";

const router = express.Router();

router.post("/add_auction", addAuction);
router.get("/get_auction", getAuction);
router.get("/get_auction/:id", getAuctionById);
router.patch("/bid_auction/:id", bidOnAuction);

export default router;
