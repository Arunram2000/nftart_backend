import express from "express";
import {
	addCollection,
	deleteCollection,
	updateCollection,
	getCollection,
} from "../controllers/collection.js";

const router = express.Router();

router.post("/add_collection", addCollection);
router.get("/get_collection/:id", getCollection);
router.patch("/update_collection/:id", updateCollection);
router.delete("/delete_collection/:id", deleteCollection);

export default router;
