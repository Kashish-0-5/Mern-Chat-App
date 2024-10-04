import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { setMessages, selectedConversation, messages } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`/api/messages/${selectedConversation._id}`
				);
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				const data = await response.json();
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};
		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};

export default useGetMessages;
