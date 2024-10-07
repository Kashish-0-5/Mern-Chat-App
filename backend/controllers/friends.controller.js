import Friend from "../models/friends.model.js";
import User from "../models/user.model.js";

export const getFriends = async (req, res) => {
	try {
		const userId = req.user._id;

		const friends = await Friend.find({ userId }).populate(
			"friendId",
			"username profilePic fullname"
		);

		res.status(200).json(friends);
	} catch (error) {
		console.log("Error in getFriends controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const addFriend = async (req, res) => {
	try {
		const { username } = req.params;
		const userId = req.user._id;

		const friend = await User.findOne({ username });

		if (!friend) {
			return res.status(404).json({ error: "User not found" });
		}

		const existingFriend = await Friend.findOne({
			userId,
			friendId: friend._id,
		});

		if (existingFriend) {
			return res.status(400).json({ error: "Friend already exists" });
		}

		const newFriend = new Friend({
			userId,
			friendId: friend._id,
		});

		await newFriend.save();
		res.status(201).json(newFriend);
	} catch (error) {
		console.log("Error in addFriend controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
