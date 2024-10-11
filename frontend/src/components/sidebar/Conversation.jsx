import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../store/useConversation";
import useGetNotifications from "../../hooks/useGetNotifications";
import { extractTime } from "../../utils/extractTime";
import truncateMessage from "../../utils/truncateText";

const Conversation = ({ conversation, lastIdx }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { notifications } = useGetNotifications();

	const latestMessagesInfo = notifications
		.filter((notification) => !notification.closed)
		.map((notification) => {
			const latestMessage =
				notification.messages[notification.messages.length - 1];
			const message = truncateMessage(latestMessage.message, 20);
			const time = extractTime(latestMessage.createdAt);
			const count = notification.count;

			return {
				latestMessage,
				message,
				time,
				count,
			};
		});

	//unread and last message details
	const latest_message = latestMessagesInfo.find(
		(info) => info.latestMessage.senderId === conversation.friendId._id
	)?.message;
	const time_latest_message = latestMessagesInfo.find(
		(info) => info.latestMessage.senderId === conversation.friendId._id
	)?.time;
	const unread_count = latestMessagesInfo.find(
		(info) => info.latestMessage.senderId === conversation.friendId._id
	)?.count;

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation.friendId._id);
	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
					${isSelected ? "bg-sky-500" : ""}
				`}
				onClick={() => setSelectedConversation(conversation)}>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className="w-12 rounded-full">
						<img src={conversation.friendId.profilePic} alt="user avatar" />
					</div>
				</div>

				<div className="flex flex-col flex-1">
					<div className="flex gap-3 justify-between items-center">
						<p className="font-bold text-gray-200">
							{conversation.friendId.username}
						</p>
						{unread_count > 0 && (
							<span className="text-sm rounded-full bg-sky-500 text-white h-5 w-5 text-center">
								{unread_count}
							</span>
						)}
					</div>
					<div className="flex gap-3 justify-between items-center">
						<p className="text-gray-400 text-sm ">{latest_message}</p>
						<span className="text-gray-400 text-sm ">
							{time_latest_message}
						</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className="divider my-0 py-0 h-1" />}
		</>
	);
};
export default Conversation;
