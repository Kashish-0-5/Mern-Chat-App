import { useState } from "react";
import toast from "react-hot-toast";
import { useConversationsContext } from "../context/ConversationContext";

const useAddFriend = () => {
	const [loading, setLoading] = useState(false);
	const { fetchConversations } = useConversationsContext();

	const addFriend = async (username) => {
		setLoading(true);
		try {
			const response = await fetch(`/api/friends/add/${username}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to add friend");
			}

			toast.success("Friend added");
			await fetchConversations();
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { addFriend, loading };
};

export default useAddFriend;
