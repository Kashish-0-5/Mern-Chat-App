import { useAuthContext } from "../../context/AuthContext";
import AddFriend from "./AddFriend.jsx";

function Header() {
	const { authUser } = useAuthContext();
	return (
		<>
			<div className="flex items-center justify-between">
				<div
					className="flex items-center gap-2 mb-2 rounded-md shadow-lg justify-start bg-[#3268ab] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 py-2 px-2 w-fit cursor-pointer tooltip tooltip-bottom"
					data-tip="Profile">
					<img
						src={authUser.profilePic}
						alt="profile pic"
						className="w-7 h-7 rounded-full ml-2"
					/>

					<p className="text-md font-bold text-gray-300 mr-2">
						{authUser.username}
					</p>
				</div>
				<div className="h-full flex gap-2 items-center">
					<AddFriend />
				</div>
			</div>
		</>
	);
}

export default Header;
