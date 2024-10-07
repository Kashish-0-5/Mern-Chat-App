import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "./AuthContext";

const ConversationsContext = createContext();

export const useConversationsContext = () => {
	return useContext(ConversationsContext);
};

export const ConversationsContextProvider = ({ children }) => {
	const { authUser } = useAuthContext();
	const [conversations, setConversations] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchConversations = async () => {
		if (!authUser) return;

		setLoading(true);
		try {
			const response = await fetch("/api/friends");
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

	// Fetch conversations when authUser changes (login/logout)
	useEffect(() => {
		if (authUser) {
			fetchConversations();
		} else {
			setConversations([]);
		}
	}, [authUser]);

	return (
		<ConversationsContext.Provider
			value={{ conversations, fetchConversations, loading }}>
			{children}
		</ConversationsContext.Provider>
	);
};
