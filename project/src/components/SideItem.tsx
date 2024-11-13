import { ReactElement } from "react";
import { SideItemProps } from "../types";
import useHandleAdd from "../hooks/useHandleAdd";

function SideItem({ item }: SideItemProps): ReactElement {
	const handleAdd = useHandleAdd();

	return (
		<li
			className="w-fit h-fit py-2 px-3 rounded-[4px] bg-shade-24-light text-[14px] leading-[16.8px] active:bg-coal hover:cursor-pointer select-none"
			onClick={() => handleAdd(item)}>
			{item.name}
		</li>
	);
}

export default SideItem;
