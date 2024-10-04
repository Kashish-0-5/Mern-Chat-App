import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useGetConversation = () => {
	const [conversations, setConversations] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getConversation = async () => {
			setLoading(true);
			try {
				const response = await fetch("/api/users");
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				const data = await response.json();
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};
		getConversation();
	}, []);

	return { conversations, loading };
};

export default useGetConversation;
