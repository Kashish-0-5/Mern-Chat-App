import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import AddFriend from "./AddFriend.jsx";
import useConversation from "../../store/useConversation.js";
import toast from "react-hot-toast";
import { useConversationsContext } from "../../context/ConversationContext.jsx";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useConversationsContext();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) =>
			c.friendId.fullname.toLowerCase().includes(search.toLowerCase())
		);

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="flex items-center gap-2">
				<input
					type="text"
					placeholder="Search…"
					className="input input-bordered rounded-full"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button
					type="submit"
					className="btn btn-circle bg-sky-500 text-white border-none">
					<IoSearchSharp className="w-6 h-6 outline-none" />
				</button>
			</form>
			<AddFriend />
		</>
	);
};
export default SearchInput;
