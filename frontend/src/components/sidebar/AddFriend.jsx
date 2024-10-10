import { RiUserAddLine } from "react-icons/ri";
import { useState } from "react";
import useAddFriend from "../../hooks/useAddFriend";

const AddFriend = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [username, setUsername] = useState("");
	const { addFriend, loading } = useAddFriend();

	const toggleModal = () => {
		setModalOpen(!modalOpen);
	};

	const handleAddFriend = async (username) => {
		await addFriend(username);
		setUsername("");
		toggleModal();
	};

	return (
		<>
			<button
				className="btn btn-sm bg-sky-500 text-white border-0 mb-[8px]"
				onClick={() => toggleModal()}>
				Add Friend <RiUserAddLine />
			</button>

			{/* Modal */}
			{modalOpen && (
				<>
					<div className="fixed inset-0 bg-gray-700 bg-opacity-30 z-40" />
					<div className="fixed inset-0 flex items-center justify-center z-50 text-center">
						<div className=" w-full max-w-md p-6 rounded-lg shadow-lg relative bg-gray-800 bg-opacity-100">
							<button
								className="absolute right-2 top-2 text-black bg-white rounded-full w-8 h-8"
								onClick={toggleModal}>
								✕
							</button>

							<h2 className="text-center mb-4 font-bold text-4xl text-gray-300">
								Add a Friend
							</h2>

							<label className="block mb-2 text-gray-300 text-start">
								Enter Username
							</label>
							<input
								type="text"
								className="input input-bordered w-full mb-4 bg-slate-500 text-white"
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
								className="btn bg-sky-500 border-0 text-white w-44"
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
