import { useContext, useEffect } from "react";
import { OrdersContext } from "../context/OrdersContext";
import logo from "../assets/logo.png";
import ReceiptItem from "../components/ReceiptItem";
import { orderReceiptItem } from "../types";
import { useNavigate } from "react-router-dom";

function Receipt() {
	const ordersContext = useContext(OrdersContext);
	const navigate = useNavigate();

	if (!ordersContext) {
		throw new Error("Missing order context.");
	}

	const { currentOrderId, orderReceipt, fetchReceipt } = ordersContext;

	useEffect(() => {
		fetchReceipt(currentOrderId);
	}, []);

	function handleNew() {
		navigate("/");
	}

	return (
		<div className="flex flex-col self-center justify-center screen-minus-96 gap-4 px-4 text-coal ">
			<div className="flex flex-col w-full justify-center items-center text-center bg-[#EEEEEE] pt-[32px] gap-[10px] rounded-[4px]">
				<img className="max-h-[40px] max-w-[40px]" src={logo} alt="Logo" />
				<p className="flex flex-col text-[24px] leading-[33.6px] text-[#353131] tracking-wider font-bold">
					KVITTO
					<span className="text-[12px] leading-[16.8px] font-bold text-[#605858]">#{currentOrderId}</span>
				</p>
				<ul className="flex flex-col w-full justify-center">
					{orderReceipt.items.map((item: orderReceiptItem) => (
						<ReceiptItem key={item.id} item={item} />
					))}
				</ul>
				<div className="flex flex-row items-center justify-between w-full h-[78px] gap-[8px] bg-[#3531313D] text-[24px] leading-[28px] font-bold p-[16px] mt-auto rounded-b-[4px]">
					<p className="flex flex-col items-start">
						<span className="text-[16px] leading-[19.2px]">TOTALT</span>
						<span className="text-[12px] leading-[14.4px] font-normal">inkl moms 20%</span>
					</p>
					{(orderReceipt.orderValue * 1.2).toFixed()} SEK
				</div>
			</div>
			<button
				className="text-center text-wrap w-full min-h-[78px] gap-[8px] bg-coal text-undisclosed rounded-[4px] text-[24px] leading-[28.8px] font-bold px-[16px] py-[20px] mt-auto hover:cursor-pointer select-none"
				onClick={() => handleNew()}>
				GÖR EN NY BESTÄLLNING
			</button>
		</div>
	);
}

export default Receipt;
