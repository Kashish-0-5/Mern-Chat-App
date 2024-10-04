import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";

function App() {
	const { authUser } = useAuthContext();
	return (
		<>
			<div className="p-4 flex h-screen items-center justify-center ">
				<Routes>
					<Route
						exact
						path="/"
						element={authUser ? <Home /> : <Navigate to="/login" />}
					/>
					<Route
						exact
						path="/login"
						element={authUser ? <Navigate to="/" /> : <Login />}
					/>
					<Route
						exact
						path="/signup"
						element={authUser ? <Navigate to="/" /> : <Signup />}
					/>
				</Routes>
				<Toaster />
			</div>
		</>
	);
}

export default App;
