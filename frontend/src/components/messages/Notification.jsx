import useGetNotifications from "../../hooks/useGetNotifications.js";
import truncateMessage from "../../utils/truncateText.js";
import { extractTime } from "../../utils/extractTime";
export default function Notification() {
	const { notification, visible, closeNotification } = useGetNotifications();

	if (!visible || !notification) return null;

	const message = truncateMessage(notification.message, 20);
	const senderName = notification.senderName || "Unknown";
	const senderProfile = notification.senderProfile || "";
	const time = extractTime(notification.createdAt);

	return (
		<div className="toast toast-top toast-end z-[999]">
			<div className="alert alert-info flex items-center">
				{/* Sender's profile picture */}
				{senderProfile ?
					<img
						src={senderProfile}
						alt="Sender Profile"
						className="w-8 h-8 rounded-full mr-2"
					/>
				:	<div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>}

				{/* Message and sender name */}
				<div>
					<p className="text-xs text-gray-800 text-start">{senderName}</p>
					<strong>{message}</strong>
					<p className="text-xs text-gray-500 text-start">{time}</p>
				</div>

				{/* Close button */}
				<button
					onClick={closeNotification}
					className="ml-auto btn btn-xs btn-circle bg-blue-800 border-none text-white">
					✕
				</button>
			</div>
		</div>
	);
}
