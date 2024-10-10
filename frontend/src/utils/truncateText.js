const truncateMessage = (message, length) => {
	if (message.length <= length) return message;
	return message.slice(0, 20) + "...";
};

export default truncateMessage;
