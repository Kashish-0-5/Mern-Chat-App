import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import Header from "./Header";

const Sidebar = () => {
	return (
		<div className="border-r border-slate-500 p-4 flex flex-col bg-[#0e2643] h-screen">
			<Header />
			<SearchInput />
			<div className="divider px-3"></div>
			<Conversations />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;
