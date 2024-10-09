import { RiUserAddLine } from "react-icons/ri";
import { useState } from "react";
import useAddFriend from "../../hooks/useAddFriend";
import toast from "react-hot-toast";

const AddFriend = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [username, setUsername] = useState("");
	const { addFriend, loading } = useAddFriend();

	const toggleModal = () => {
		setUsername("");
		setModalOpen(!modalOpen);
	};

	const handleAddFriend = (username) => {
		if (!username) {
			return toast.error("Please enter your friend's username");
		}
		if (username.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}
		addFriend(username);
		setUsername("");
		toggleModal();
	};

	return (
		<>
			<button
				className="btn bg-sky-500 text-white border-0 h-4 mt-3 w-full hover:bg-blue-500"
				onClick={() => toggleModal()}>
				Add Friend <RiUserAddLine />
			</button>

			{/* Modal */}
			{modalOpen && (
				<>
					<div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40" />
					<div className="fixed inset-0 flex items-center justify-center z-50 ">
						<div className=" w-full max-w-md p-6 rounded-lg shadow-lg relative bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-75">
							<button
								className="absolute right-2 top-2 text-black bg-white rounded-full w-8 h-8"
								onClick={toggleModal}>
								✕
							</button>

							<h2 className="text-center mb-4 font-bold text-4xl text-white">
								Add a Friend
							</h2>

							<label className="block mb-2 text-white">Enter Username</label>
							<input
								type="text"
								className="input input-bordered w-full mb-4 bg-white"
								placeholder="Username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleAddFriend(username);
									}
								}}
							/>

							<button
								className="btn bg-sky-500 border-0 text-white w-full"
								onClick={() => handleAddFriend(username)}>
								{loading ?
									<span className="loading loading-spinner"></span>
								:	"Add"}
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default AddFriend;
