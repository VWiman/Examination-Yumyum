import { ReactNode, useContext } from "react";
import CheckoutItem from "../components/CheckoutItem";
import useCart from "../hooks/useCart";
import { CartItem } from "../types";
import { OrdersContext } from "../context/OrdersContext";
import { useNavigate } from "react-router-dom";

function Checkout(): ReactNode {
	const { cartItems, totalPriceWithTax } = useCart();
	const ordersContext = useContext(OrdersContext);
	const navigate = useNavigate()

	if (!ordersContext) {
		throw new Error("Missing context.");
	}

	const { postOrder } = ordersContext;

	const handleOrderSubmit = (): void => {
		if(cartItems.length > 0){postOrder();
		setTimeout(() => {
			navigate("/confirmation");
		}, 200);}
	};

	return (
		<div className="flex flex-col screen-minus-96 w-full gap-4 px-4 text-coal">
			<ul className="rounded-lg">
				{cartItems.map((item: CartItem) => {
					return <CheckoutItem key={item.id} item={item} />;
				})}
			</ul>
			<button className="flex flex-row items-center justify-between w-full h-[78px] gap-[8px] bg-shade-24-dark rounded-[4px] text-[32px] leading-[38.4px] font-bold px-[16px] py-[20px] mt-auto hover:cursor-pointer select-none">
				<p className="flex flex-col items-start">
					<span className="text-[22px] leading-[26.4px]">TOTALT</span>
					<span className="text-[14px] leading-[16.8px] font-medium">inkl moms 20%</span>
				</p>
				{totalPriceWithTax.toFixed()} SEK
			</button>
			<button
				className="flex flex-row items-center justify-center w-full h-[78px] gap-[8px] bg-coal text-snow rounded-[4px] text-[24px] leading-[28.8px] font-bold px-[16px] py-[20px] hover:cursor-pointer select-none"
				onClick={handleOrderSubmit}>
				TAKE MY MONEY!
			</button>
		</div>
	);
}

export default Checkout;
