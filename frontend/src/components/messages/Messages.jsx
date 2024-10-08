import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import Skeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../store/useConversation";

const Messages = () => {
	const { loading, messages } = useGetMessages();
	const { selectedConversation } = useConversation();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	const filteredMessages = messages.filter(
		(message) =>
			message.senderId === selectedConversation?.friendId._id ||
			message.receiverId === selectedConversation?.friendId._id
	);

	return (
		<div className="px-4 flex-1 overflow-auto">
			{!loading &&
				filteredMessages.length > 0 &&
				filteredMessages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <Skeleton key={idx} />)}
			{!loading && filteredMessages.length === 0 && (
				<p className="text-center">Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;
