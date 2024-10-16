import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
import AddFriend from "./AddFriend.jsx";
import Profile from "../profile/Profile.jsx";

function Header() {
	const { authUser } = useAuthContext();
	const [userProfile, setUserProfile] = useState(false);
	return (
		<>
			{userProfile && (
				<div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40">
					<Profile setUserProfile={setUserProfile} profile="user" />
				</div>
			)}
			<div className="flex items-center justify-between">
				<div className="h-full flex gap-2 items-center">
					<AddFriend />
				</div>
				<div
					className="flex items-center gap-2 mb-2 rounded-md justify-start py-2 px-2 w-fit hover:bg-[#3268ab] hover:shadow-lg cursor-pointer tooltip tooltip-bottom hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-lg hover:bg-opacity-30"
					data-tip="Profile"
					onClick={() => setUserProfile(true)}>
					<img
						src={authUser.profilePic}
						alt="profile pic"
						className="w-8 h-8 rounded-full ml-2"
					/>

					<p className="text-md font-bold text-gray-300 mr-2">
						{authUser.username}
					</p>
				</div>
			</div>
		</>
	);
}

export default Header;
