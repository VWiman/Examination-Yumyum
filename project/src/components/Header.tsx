import { ReactElement, useEffect, useState } from "react";
import cartIcon from "../assets/cart.svg";
import useCart from "../hooks/useCart";
import { useLocation, useNavigate } from "react-router-dom";

function Header(): ReactElement {
	const { cartItems, totalItemsCount } = useCart();
	const [isHidden, setIsHidden] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	function handleNavigate() {
		if (location.pathname === "/") {
			navigate("/checkout");
		} else if (location.pathname === "/checkout") {
			navigate("/");
		} else {
			navigate("/");
		}
	}

	useEffect(() => {
		if (location.pathname == "/confirmation" || location.pathname ==  "/receipt") {
			setIsHidden(true);
		} else {
			setIsHidden(false);
		}
	}, [navigate])

	useEffect(() => {
		console.log(cartItems);
	}, [cartItems]);

	return (
		<header className={`fixed right-0 top-0 h-[80px] max-h-[80px] ${isHidden ? "hidden" : ""}`}>
			<div className="relative w-[75px] h-[75px] mt-[5px] mr-[5px] ml-auto" onClick={() => handleNavigate()}>
				<div className="flex items-center justify-center absolute bottom-0 w-[64px] h-[64px] rounded-[4px] bg-snow">
					<img height="32px" width="32px" src={cartIcon}></img>
				</div>
			</div>
			{totalItemsCount > 0 && (
				<div className="absolute flex items-center justify-center top-[5px] right-[5px] w-[24px] h-[24px] rounded-full bg-alert">
					<p className="font-bold text-[10px] text-snow">{totalItemsCount}</p>
				</div>
			)}
		</header>
	);
}

export default Header;
