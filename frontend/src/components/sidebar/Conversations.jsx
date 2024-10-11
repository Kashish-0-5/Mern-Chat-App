import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis";
import { useConversationsContext } from "../../context/ConversationContext";

const Conversations = () => {
	const { conversations, loading } = useConversationsContext();

	return (
		<>
			{!conversations.length && <p className="text-center">No friends yet</p>}
			<div className="py-2 flex flex-col overflow-auto">
				{conversations.map((conversation, index) => (
					<Conversation
						key={conversation._id}
						conversation={conversation}
						emoji={getRandomEmoji()}
						lastIdx={index === conversations.length - 1}
					/>
				))}

				{loading ?
					<span className="loading loading-spinner mx-auto"></span>
				:	null}
			</div>
		</>
	);
};
export default Conversations;
