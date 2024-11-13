import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { fetchMenu } from "../hooks/fetchMenu";
import { DipsType, DrinksType, ItemsContextType, ItemType, ItemTypeEnum, WontonsType } from "../types";

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

const ItemsProvider = ({ children }: { children: ReactNode }): ReactElement => {
	// States
	const [menuItems, setMenuItems] = useState<ItemType[]>([]);
	const [wontons, setWontons] = useState<WontonsType[]>([]);
	const [dips, setDips] = useState<DipsType[]>([]);
	const [drinks, setDrinks] = useState<DrinksType[]>([]);

	// Fetch
	useEffect(() => {
		async function initialFetch(): Promise<void> {
			const fetchedItems = await fetchMenu<ItemType[] | []>(import.meta.env.VITE_API_KEY, import.meta.env.VITE_URL);
			setMenuItems(fetchedItems);
			setWontons(fetchedItems.filter((item) => item.type === ItemTypeEnum.wonton));
			setDips(fetchedItems.filter((item) => item.type === ItemTypeEnum.dip));
			setDrinks(fetchedItems.filter((item) => item.type === ItemTypeEnum.drink));
		}
		initialFetch();
	}, []);

	return (
		<ItemsContext.Provider value={{ menuItems, wontons, dips, drinks, setMenuItems }}>{children}</ItemsContext.Provider>
	);
};

export { ItemsContext, ItemsProvider };
