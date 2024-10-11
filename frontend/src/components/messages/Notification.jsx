import useGetNotifications from "../../hooks/useGetNotifications.js";
import truncateMessage from "../../utils/truncateText.js";
import { extractTime } from "../../utils/extractTime";

export default function Notification() {
	const { notifications, closeNotification } = useGetNotifications();

	if (notifications.length === 0) return null;

	return (
		<div className="toast toast-top toast-end z-[999]">
			{/* Display notifications for each sender */}
			{notifications
				.filter((notification) => !notification.closed) // Only show if not closed
				.map((notification) => {
					const latestMessage = notification.messages[0]; // Get the latest message
					const message = truncateMessage(latestMessage.message, 20);
					const senderName = notification.senderName || "Unknown";
					const senderProfile = notification.senderProfilePic || "";
					const time = extractTime(latestMessage.createdAt);

					return (
						<div
							key={notification.senderId}
							className="alert alert-info flex items-center p-[10px] mb-2">
							{/* Sender's profile picture */}
							{senderProfile ?
								<img
									src={senderProfile}
									alt="Sender Profile"
									className="w-12 h-12 rounded-full mr-2"
								/>
							:	<div className="w-12 h-12 bg-gray-300 rounded-full mr-2"></div>}

							{/* Message and sender name */}
							<div>
								<p className="text-xs text-gray-800 text-start">{senderName}</p>
								<strong>{message}</strong>
								<p className="text-xs text-gray-500 text-start">{time}</p>

								{/* Notification count for this sender */}
								{notification.count > 1 && (
									<p className="text-xs text-blue-950">
										({notification.count} new messages)
									</p>
								)}
							</div>

							{/* Close button */}
							<button
								onClick={() => closeNotification(notification.senderId)}
								className="ml-auto btn btn-xs btn-circle bg-blue-800 border-none text-white">
								✕
							</button>
						</div>
					);
				})}
		</div>
	);
}
