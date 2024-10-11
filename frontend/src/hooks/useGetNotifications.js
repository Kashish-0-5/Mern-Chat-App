import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import useConversation from "../store/useConversation";

const useGetNotifications = () => {
	const { socket } = useSocketContext();
	const { selectedConversation } = useConversation();
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		const handleNewMessage = (newMessage) => {
			const isCurrentChat =
				selectedConversation?.friendId._id === newMessage.senderId;

			if (!isCurrentChat) {
				setNotifications((prevNotifications) => {
					const existingNotification = prevNotifications.find(
						(notif) => notif.senderId === newMessage.senderId
					);

					if (existingNotification) {
						// If a notification from this sender already exists, increment the count
						return prevNotifications.map((notif) =>
							notif.senderId === newMessage.senderId ?
								{
									...notif,
									messages: [...notif.messages, newMessage],
									count: notif.count + 1,
									closed: false,
								}
							:	notif
						);
					} else {
						// Add a new notification for a new sender
						return [
							{
								senderId: newMessage.senderId,
								senderName: newMessage.senderName,
								senderProfilePic: newMessage.senderProfilePic,
								messages: [newMessage],
								count: 1,
								closed: false,
							},
							...prevNotifications,
						];
					}
				});
			}
		};

		socket?.on("newMessage", handleNewMessage);

		return () => {
			socket?.off("newMessage", handleNewMessage);
		};
	}, [socket, selectedConversation]);

	// Reset the notification count to 0 when opening a chat with a specific user
	useEffect(() => {
		if (selectedConversation) {
			setNotifications((prevNotifications) =>
				prevNotifications.map((notif) =>
					notif.senderId === selectedConversation.friendId._id ?
						{ ...notif, count: 0 }
					:	notif
				)
			);
		}
	}, [selectedConversation]);

	// Function to close the notification but keep the data
	const closeNotification = (senderId) => {
		setNotifications((prevNotifications) =>
			prevNotifications.map((notif) =>
				notif.senderId === senderId ? { ...notif, closed: true } : notif
			)
		);
	};

	return { notifications, closeNotification };
};

export default useGetNotifications;
