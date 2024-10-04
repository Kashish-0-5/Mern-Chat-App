import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({
		fullname,
		username,
		password,
		confirmPassword,
		gender,
	}) => {
		const success = handleInputErrors({
			fullname,
			username,
			password,
			confirmPassword,
			gender,
		});
		if (!success) return;

		try {
			setLoading(true);
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fullname,
					username,
					password,
					confirmPassword,
					gender,
				}),
			});

			const data = await response.json();
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			toast.success("Signup successful! You can now login.");

			setAuthUser(data);
			return true;
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { signup, loading };
};

export default useSignup;

function handleInputErrors({
	fullname,
	username,
	password,
	confirmPassword,
	gender,
}) {
	if (!fullname || !username || !password || !confirmPassword || !gender) {
		toast.error("Please fill all the fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters long");
		return false;
	}

	return true;
}
