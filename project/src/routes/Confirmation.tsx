import { ReactNode, useContext, useEffect, useState } from "react";
import boxtop from "../assets/boxtop.png";
import { OrdersContext } from "../context/OrdersContext";
import { useNavigate } from "react-router-dom";

function Confirmation(): ReactNode {
	const ordersContext = useContext(OrdersContext);
	const navigate = useNavigate();
	const [displayETA, setDisplayETA] = useState("Hämtar ETA...");

	if (!ordersContext) {
		throw new Error("Missing order context.");
	}

	const { currentOrderId, fetchOrder, currentOrder } = ordersContext;

	function handleNew() {
		navigate("/");
	}

	useEffect(() => {
		if (currentOrderId !== "") {
			fetchOrder(currentOrderId);
		}
	}, []);

	useEffect(() => {
		if (currentOrder && currentOrder.eta) {
			const etaTime = new Date(currentOrder.eta).getTime();

			const interval = setInterval(() => {
				const now = new Date().getTime();
				const timeRemaining = Math.max(0, etaTime - now);

				const minutesRemaining = Math.ceil(timeRemaining / (1000 * 60));

				setDisplayETA(`ETA ${minutesRemaining} MIN`);

				if (timeRemaining <= 0) {
					clearInterval(interval);
					setDisplayETA("Färdiga!");
				}
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [currentOrder]);

	return (
		<div className="flex flex-col screen-minus-96 w-full gap-4 px-4 text-coal">
			<img className="flex self-center" src={boxtop} />
			<div className="flex flex-col text-center self-center items-center justify-center w-[326px] text-snow gap-[16px]">
				<p className="flex-wrap w-full text-[32px] leading-[38.4px] font-bold">DINA WONTONS TILLAGAS!</p>
				<p className="text-[26px] leading-[31.2px] font-medium">{displayETA}</p>
				<p className="text-[15px] leading-[18px] font-medium">#{currentOrderId}</p>
			</div>

			<button
				className="text-center font-bold w-full h-[78px] gap-[8px] bg-shade-24-dark rounded-[4px] text-[24px] leading-[28.8px] border-2 border-undisclosed/80 text-undisclosed/80 px-[16px] py-[20px] mt-auto hover:cursor-pointer select-none"
				onClick={() => navigate("/receipt")}>
				SE KVITTO
			</button>
			<button
				className="text-center text-wrap w-full min-h-[78px] gap-[8px] bg-coal text-undisclosed rounded-[4px] text-[24px] leading-[28.8px] font-bold px-[16px] py-[20px] hover:cursor-pointer select-none"
				onClick={() => handleNew()}>
				GÖR EN NY BESTÄLLNING
			</button>
		</div>
	);
}

export default Confirmation;
