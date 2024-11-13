import { ReactNode, useContext } from "react";
import { ItemsContext } from "../context/ItemsContext";
import { DipsType, DrinksType, WontonsType } from "../types";
import WotonItem from "../components/WotonItem";
import SideItem from "../components/SideItem";

function Order(): ReactNode {
	const context = useContext(ItemsContext);

	if (!context) {
		throw new Error("Could not find products");
	}

	const { wontons, dips, drinks } = context;

	return (
		<div className="flex flex-col gap-4 px-4 text-snow">
			<h1 className="font-bold text-[32px] leading-[16px]">MENY</h1>
			<ul className="bg-clay rounded-lg">
				{wontons.map((woton: WontonsType) => {
					return <WotonItem key={woton.id} item={woton} />;
				})}
			</ul>
			<ul className="flex flex-col w-full gap-4">
				<li className="flex flex-col w-full p-4 gap-6 rounded-lg bg-clay">
					<p className="flex flex-row w-full font-bold text-[22px] leading-[26.4px] uppercase">
						<span className="w-fit">DIPSÅS</span>
						<span className="flex-1 border-b-2 border-dotted"></span>
						<span className="inline ml-auto w-fit">{dips.length > 0 ? dips[0].price : 0} sek</span>
					</p>
					<ul className="flex flex-wrap w-full gap-4">
						{dips.map((side: DipsType) => {
							return <SideItem key={side.id} item={side} />;
						})}
					</ul>
				</li>
				<li className="flex flex-col w-full p-4 gap-6 rounded-lg bg-clay">
					<p className="flex flex-row w-full font-bold text-[22px] leading-[26.4px] uppercase">
						<span className="w-fit">Dricka</span>
						<span className="flex-1 border-b-2 border-dotted"></span>
						<span className="inline ml-auto w-fit">{drinks.length > 0 ? drinks[0].price : 0} sek</span>
					</p>
					<ul className="flex flex-wrap w-full gap-4">
						{drinks.map((side: DrinksType) => {
							return <SideItem key={side.id} item={side} />;
						})}
					</ul>
				</li>
			</ul>
		</div>
	);
}

export default Order;
