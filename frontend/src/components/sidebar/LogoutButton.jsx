import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();
	return (
		<div className="mt-auto cursor-pointer" onClick={logout}>
			{!loading ?
				<div className="flex gap-1">
					<BiLogOut className="w-6 h-6 text-white cursor-pointer" />
					<p>Logout</p>
				</div>
			:	<span className="loading loading-spinner"></span>}
		</div>
	);
};
export default LogoutButton;
