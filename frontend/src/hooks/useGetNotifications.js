import { useEffect, useState, useRef } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import useConversation from "../store/useConversation";

const useGetNotifications = () => {
	const { socket } = useSocketContext();
	const { selectedConversation } = useConversation();
	const [notifications, setNotifications] = useState([]);
	const timersRef = useRef({});

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
						// Clear existing timer
						if (timersRef.current[newMessage.senderId]) {
							clearTimeout(timersRef.current[newMessage.senderId]);
						}

						// Set new timer
						timersRef.current[newMessage.senderId] = setTimeout(() => {
							closeNotification(newMessage.senderId);
						}, 3000);

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
						// Set timer for new notification
						timersRef.current[newMessage.senderId] = setTimeout(() => {
							closeNotification(newMessage.senderId);
						}, 3000);

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
			// Clear all timers on cleanup
			Object.values(timersRef.current).forEach(clearTimeout);
		};
	}, [socket, selectedConversation]);

	useEffect(() => {
		if (selectedConversation) {
			setNotifications((prevNotifications) =>
				prevNotifications.map((notif) =>
					notif.senderId === selectedConversation.friendId._id ?
						{ ...notif, count: 0 }
					:	notif
				)
			);
			closeNotification(selectedConversation.friendId._id);
		}
	}, [selectedConversation]);

	const closeNotification = (senderId) => {
		setNotifications((prevNotifications) =>
			prevNotifications.map((notif) =>
				notif.senderId === senderId ? { ...notif, closed: true } : notif
			)
		);
		// Clear the timer when closing the notification
		if (timersRef.current[senderId]) {
			clearTimeout(timersRef.current[senderId]);
			delete timersRef.current[senderId];
		}
	};

	return { notifications, closeNotification };
};

export default useGetNotifications;
