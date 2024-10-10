import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";

const useGetNotifications = () => {
	const { socket } = useSocketContext();
	const [notification, setNotification] = useState(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handleNewMessage = (newMessage) => {
			setNotification(newMessage);
			setVisible(true);

			setTimeout(() => {
				setVisible(false);
			}, 10000);
		};

		socket?.on("newMessage", handleNewMessage);

		return () => {
			socket?.off("newMessage", handleNewMessage);
		};
	}, [socket]);

	const closeNotification = () => {
		setVisible(false);
	};

	return { notification, visible, closeNotification };
};

export default useGetNotifications;
