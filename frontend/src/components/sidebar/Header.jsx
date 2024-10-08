import { useAuthContext } from "../../context/AuthContext";

function Header() {
	const { authUser } = useAuthContext();
	return (
		<>
			<div className="flex items-center gap-2 mb-2 rounded-md shadow-lg justify-start bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 py-1 px-2">
				<p className="text-md font-bold">Logged in as : </p>
				<img
					src={authUser.profilePic}
					alt="profile pic"
					className="w-7 h-7 rounded-full ml-2"
				/>

				<p className="text-md font-bold ">{authUser.username}</p>
			</div>
		</>
	);
}

export default Header;
