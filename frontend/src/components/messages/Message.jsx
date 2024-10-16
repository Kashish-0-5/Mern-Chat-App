import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";
import { extractTime } from "../../utils/extractTime";

function Message({ message }) {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic =
		fromMe ? authUser.profilePic : selectedConversation?.friendId.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<>
			<div className={`chat ${chatClassName}`}>
				<div className="chat-image avatar">
					<div className="w-10 rounded-full">
						<img src={profilePic} alt="Chat bubble" />
					</div>
				</div>
				<div
					className={`chat-bubble text-white  ${bubbleBgColor} ${shakeClass}`}
					style={{
						maxWidth: "75%",
						wordWrap: "break-word",
						overflow: "hidden",
						whiteSpace: "normal",
						padding: "10px",
					}}>
					{message.message}
				</div>
				<div className="chat-footer opacity-50 text-xs flex gap-1 items-center font-bold">
					{formattedTime}
				</div>
			</div>
		</>
	);
}

export default Message;
