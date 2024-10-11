import { BsSend } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = ({ selectedConversation }) => {
	const [message, setMessage] = useState("");
	const { sendMessage, loading } = useSendMessage();
	const textareaRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!message) return;

		await sendMessage(message);
		setMessage("");
		textareaRef.current.style.height = "50px";
	};

	useEffect(() => {
		setMessage("");
		// Reset height when conversation changes
		if (textareaRef.current) {
			textareaRef.current.style.height = "50px";
		}
	}, [selectedConversation]);

	const handleInputChange = (e) => {
		setMessage(e.target.value);
		textareaRef.current.style.height = "auto";
		textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	return (
		<form className="px-4 my-3" onSubmit={handleSubmit}>
			<div className="w-full relative">
				<textarea
					ref={textareaRef}
					className="border text-sm rounded-lg block w-full p-2.5 pt-3.5 pr-9 bg-gray-700 border-gray-600 text-white resize-none overflow-auto text-pretty"
					placeholder="Send a message"
					value={message}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					style={{ maxHeight: "200px", height: "50px", overflowY: "auto" }}
				/>
				<button
					type="submit"
					className="absolute inset-y-0 end-0 flex items-center pe-3 self-end mb-3 mr-2">
					{loading ?
						<div className="loading loading-spinner"></div>
					:	<BsSend />}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
