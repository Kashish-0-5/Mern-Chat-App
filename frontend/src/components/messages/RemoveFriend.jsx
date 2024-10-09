import toast from "react-hot-toast";
import useConversation from "../../store/useConversation";
import { useDeleteFriend } from "../../hooks/useDeleteFriend";
import { useConversationsContext } from "../../context/ConversationContext";

function RemoveFriend({ setModalOpen, toggleModal }) {
	const { deleteFriend, loading } = useDeleteFriend();
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { fetchConversations } = useConversationsContext();

	const handleDeleteFriend = async () => {
		setModalOpen(false);
		const response = await deleteFriend(selectedConversation.friendId._id);

		if (!response.error) {
			fetchConversations();
			toast.success("Friend removed");
			setSelectedConversation(null);
		} else {
			toast.error("Failed to delete friend");
		}
	};

	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center z-50 ">
				<div className=" w-full max-w-md p-6 rounded-lg shadow-lg relative bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-75 text-center">
					<p className="text-gray-300 text-2xl font-bold text-center mb-4 mr-2">
						Are you sure you want to remove this friend?
					</p>
					<p className="text-red-300 text-sm text-center mb-4 mr-2 ">
						This will delete all the chats you have with this friend.*
					</p>
					<button
						className="absolute right-2 top-2 text-black bg-white rounded-full w-8 h-8"
						onClick={toggleModal}>
						✕
					</button>

					<button
						className="btn bg-red-500 border-0 text-white"
						onClick={handleDeleteFriend}>
						{loading ?
							<span className="loading loading-spinner"></span>
						:	"Remove"}
					</button>
				</div>
			</div>
		</>
	);
}

export default RemoveFriend;
