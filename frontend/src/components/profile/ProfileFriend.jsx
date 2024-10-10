import useConversation from "../../store/useConversation";
import { extractDate } from "../../utils/extractDate";

const ProfileFriend = ({ setFriendProfile }) => {
	const { selectedConversation } = useConversation();
	return (
		<>
			<div className="min-h-screen gap-6 flex items-center justify-center">
				<div className="bg-gray-100 dark:bg-gray-800 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
					<div className="flex items-center gap-4 realtive">
						<button
							className="absolute top-2 right-2 text-black bg-white rounded-full w-8 h-8"
							onClick={() => setFriendProfile(false)}>
							✕
						</button>
						<img
							src={selectedConversation?.friendId.profilePic}
							className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500  transform"
						/>
						<div className="w-fit transition-all transform duration-500">
							<h1 className="text-gray-600 dark:text-gray-200 font-bold">
								{selectedConversation?.friendId.username}
							</h1>
							<p className="text-gray-400">
								{selectedConversation?.friendId.fullname}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-200 mt-2">
								<span className="font-bold">Joined On :</span>{" "}
								{extractDate(selectedConversation.friendId.createdAt)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileFriend;
