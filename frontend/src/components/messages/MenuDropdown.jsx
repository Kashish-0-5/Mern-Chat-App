import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiUser } from "react-icons/fi";

export default function MenuDropdown({
	userDropdown,
	setUserDropdown,
	toggleModal,
	setFriendProfile,
}) {
	function toggleDropdown(e) {
		e.stopPropagation();
		setUserDropdown(!userDropdown);
	}
	return (
		<>
			<div className="dropdown">
				<div
					className="m-1"
					tabIndex={0}
					role="button"
					onClick={(e) => toggleDropdown(e)}>
					<HiDotsVertical className="text-white cursor-pointer" />
				</div>
				{userDropdown && (
					<ul
						className="dropdown-content menu bg-base-100 rounded-md z-[1] p-2 shadow-lg w-44 text-gray-200 top-10 right-0"
						onClick={(e) => e.stopPropagation()}
						tabIndex={0}>
						<li>
							<button
								className="btn-sm btn w-full bg-sky-500 hover:bg-sky-600 border-none text-white my-2"
								to="/profile-friend"
								onClick={() => setFriendProfile(true)}>
								Friend Profile
								<FiUser />
							</button>
						</li>
						<li>
							{/* Remove Friend */}
							<button
								className="btn-sm btn w-full bg-red-700 hover:bg-red-800 border-none text-white mb-2"
								onClick={() => toggleModal()}>
								Remove friend
								<MdOutlineDeleteOutline className="text-white w-4 h-4" />
							</button>
						</li>
					</ul>
				)}
			</div>
		</>
	);
}
