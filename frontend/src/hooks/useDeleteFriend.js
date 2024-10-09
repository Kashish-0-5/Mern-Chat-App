import { useState } from "react";

export const useDeleteFriend = () => {
	const [loading, setLoading] = useState(false);
	const deleteFriend = async (friendId) => {
		try {
			setLoading(true);
			const response = await fetch(`/api/friends/delete/${friendId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Failed to delete friend");
			}

			return response.json();
		} catch (error) {
			console.log("Error in deleteFriend hook: ", error.message);
			return { error: "Failed to delete friend" };
		} finally {
			setLoading(false);
		}
	};

	return { deleteFriend, loading };
};
