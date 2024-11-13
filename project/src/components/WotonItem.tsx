import { ReactElement } from "react";
import { WotonItemProps } from "../types";
import useHandleAdd from "../hooks/useHandleAdd";

function WotonItem({ item }: WotonItemProps): ReactElement {

	const handleAdd = useHandleAdd();

	return (
		<li
			className={
				"flex flex-col w-full gap-2 p-4 active:bg-coal first:rounded-t-lg last:rounded-b-lg border-b border-dotted border-shade-24-light last:border-none hover:cursor-pointer select-none"
			}
			onClick={() => handleAdd(item)}>
			<p className="flex flex-row w-full font-bold text-[22px] leading-[26.4px] uppercase">
				<span className="w-fit">{item.name}</span>
				<span className="flex-1 border-b-2 border-dotted"></span>
				<span className="inline ml-auto w-fit">{item.price} sek</span>
			</p>
			<ul className="flex flex-wrap gap-1">
				{item.ingredients.map((ingredient: string, index: number) => (
					<li key={index} className="font-medium text-[14px] leading-[16.8px]">
						{ingredient}
						{index < item.ingredients.length - 1 && ","}
					</li>
				))}
			</ul>
		</li>
	);
}

export default WotonItem;
