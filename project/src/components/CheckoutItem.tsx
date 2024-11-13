import { ReactElement } from "react";
import { CartItemProps } from "../types";
import useHandleAdd from "../hooks/useHandleAdd";
import plus from "../assets/plus.svg"
import minus from "../assets/minus.svg";
import useCart from "../hooks/useCart";

function CheckoutItem({ item }: CartItemProps): ReactElement {
	const handleAdd = useHandleAdd();
	const {removeFromCart} = useCart()

	function handleRemove():void {
		removeFromCart(item.id)
	}

	return (
		<li className={"flex flex-col w-full gap-2 p-4 border-b border-dotted border-shade-24-dark last:border-none"}>
			<p className="flex flex-row w-full font-bold text-[22px] leading-[26.4px] uppercase">
				<span className="w-fit">{item.name}</span>
				<span className="flex-1 border-b-2 border-dotted border-coal"></span>
				<span className="inline ml-auto w-fit">{item.price * item.quantity} sek</span>
			</p>
			<div className="flex flex-row gap-[10px] items-center min-w-[128px] min-h-[32px] text-[14px] leading-[15.4px] font-medium">
				<button
					className="flex items-center justify-center h-[24px] w-[24px] rounded-full bg-shade-24-dark"
					onClick={() => handleAdd(item)}>
					<img src={plus} />
				</button>
				<p>{item.quantity} stycken</p>
				<button className="flex items-center justify-center h-[24px] w-[24px] rounded-full bg-shade-24-dark" onClick={() => handleRemove()}>
					<img src={minus} />
				</button>
			</div>
		</li>
	);
}

export default CheckoutItem;
