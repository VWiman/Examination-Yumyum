import { ReactElement } from "react";
import { orderReceiptItem } from "../types";

type ReceiptItemProps = {
	item: orderReceiptItem;
};

function ReceiptItem({ item }: ReceiptItemProps): ReactElement {
	const { name, price, quantity } = item;
	return (
		<li className="flex flex-col w-full gap-2 p-4 border-b border-dotted border-shade-24-dark last:border-none">
			<p className="flex flex-row w-full font-bold text-[16px] leading-[19.2px] uppercase">
				<span className="w-fit">{name}</span>
				<span className="flex-1 border-b-2 border-dotted border-coal"></span>
				<span className="inline ml-auto w-fit">{price * quantity} sek</span>
			</p>
			<span>{quantity} stycken</span>
		</li>
	);
}

export default ReceiptItem;
