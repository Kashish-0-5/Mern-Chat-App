import useConversation from "../../store/useConversation";
import { extractDate } from "../../utils/extractDate";
import { useAuthContext } from "../../context/AuthContext";

const Profile = ({ setFriendProfile, profile, setUserProfile }) => {
	const { selectedConversation } = useConversation();
	const { authUser } = useAuthContext();

	const toggleProfile = () => {
		if (profile === "friend") {
			setFriendProfile(false);
		} else {
			setUserProfile(false);
		}
	};
	return (
		<>
			<div className="min-h-screen gap-6 flex items-center justify-center">
				<div className="bg-gray-100 dark:bg-gray-800 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
					<div className="flex items-center gap-4 realtive">
						<button
							className="absolute top-2 right-2 text-black bg-white rounded-full w-8 h-8"
							onClick={toggleProfile}>
							✕
						</button>
						<img
							src={
								profile === "friend" ?
									selectedConversation?.friendId.profilePic
								:	authUser.profilePic
							}
							className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500  transform"
						/>
						<div className="w-fit transition-all transform duration-500">
							<h1 className="text-gray-600 dark:text-gray-200 font-bold">
								{profile === "friend" ?
									selectedConversation?.friendId.username
								:	authUser.username}
							</h1>
							<p className="text-gray-400">
								{profile === "friend" ?
									selectedConversation?.friendId.fullname
								:	authUser.fullname}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-200 mt-2">
								<span className="font-bold">Joined On :</span> {}
								{profile === "friend" ?
									extractDate(selectedConversation.friendId.createdAt)
								:	extractDate(authUser.createdAt)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
