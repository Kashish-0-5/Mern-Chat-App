import { useEffect, useState } from "react";
import useConversation from "../../store/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { MdOutlineDeleteOutline } from "react-icons/md";
import RemoveFriend from "./RemoveFriend";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const [modalOpen, setModalOpen] = useState(false);

	const toggleModal = () => {
		setModalOpen(!modalOpen);
	};

	useEffect(() => {
		// cleanup function (unmounts)
		return () => {
			setSelectedConversation(null);
			setModalOpen(false);
		};
	}, [setSelectedConversation]);

	return (
		<div className="md:min-w-[450px] flex flex-col chat-bg">
			{!selectedConversation ?
				<NoChatSelected />
			:	<>
					{/* Header */}
					<div className="bg-[#316cbd] px-4 py-2 mb-2 flex justify-between items-center">
						<div>
							<span className="label-text font-bold ">To:</span>{" "}
							<span className="text-gray-100 font-bold">
								{selectedConversation.friendId.username}
							</span>
						</div>
						<button
							className="btn-sm btn w-32 bg-red-700 hover:bg-red-800 border-none text-white"
							onClick={() => toggleModal()}>
							Remove
							<MdOutlineDeleteOutline className="text-white w-4 h-4" />
						</button>
					</div>
					<Messages />
					<MessageInput
						selectedConversation={selectedConversation.friendId.username}
					/>
				</>
			}

			{/* Remove Friend */}
			{modalOpen && (
				<div className="fixed inset-0 bg-gray-700 bg-opacity-0 z-40">
					<RemoveFriend setModalOpen={setModalOpen} toggleModal={toggleModal} />
				</div>
			)}
		</div>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
				<p>Welcome 👋 {authUser.username} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className="text-3xl md:text-6xl text-center" />
			</div>
		</div>
	);
};
