import useConversation from "../../store/useConversation";

function CloseConversation() {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const handleCloseConversation = () => {
		setSelectedConversation(null);
	};

	return (
		<>
			{selectedConversation && (
				<div
					className="cursor-pointer w-fit btn btn-ghost btn-sm bg-red-500 hover:bg-red-600 border-none text-white"
					onClick={handleCloseConversation}>
					Close X
				</div>
			)}
		</>
	);
}

export default CloseConversation;
