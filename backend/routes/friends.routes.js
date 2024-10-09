import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
	getFriends,
	addFriend,
	deleteFriend,
} from "../controllers/friends.controller.js";

const router = express.Router();

router.get("/", protectRoute, getFriends);
router.post("/add/:username", protectRoute, addFriend);
router.delete("/delete/:friendId", protectRoute, deleteFriend);

export default router;
