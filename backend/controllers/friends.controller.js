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

		const existingFriendForUser = await Friend.findOne({
			userId,
			friendId: friend._id,
		});

		const existingFriendForFriend = await Friend.findOne({
			userId: friend._id,
			friendId: userId,
		});

		if (existingFriendForUser || existingFriendForFriend) {
			return res.status(400).json({ error: "Already Friends" });
		}

		const newFriendForUser = new Friend({
			userId,
			friendId: friend._id,
		});

		const newFriendForFriend = new Friend({
			userId: friend._id,
			friendId: userId,
		});

		await Promise.all([newFriendForUser.save(), newFriendForFriend.save()]);

		res.status(201).json({ message: "Friend added for both users" });
	} catch (error) {
		console.log("Error in addFriend controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
