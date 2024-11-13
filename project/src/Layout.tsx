import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";

function Layout() {
	const location = useLocation()



	return (
		<>
			<Header />
			<main
				className={`pb-[16px] ${
					location.pathname == "/checkout"
						? "bg-ash"
						: location.pathname == "/confirmation" || location.pathname == "/receipt"
						? "bg-clay"
						: "bg-dark-mint"
				} pt-[80px] w-screen h-full min-h-screen`}>
				<Outlet />
			</main>
		</>
	);
}

export default Layout;
