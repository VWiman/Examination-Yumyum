import { useContext } from "react";
import { CartContextType } from "../types";
import { CartContext } from "../context/CartContext";

const useCart = (): CartContextType => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("Could not find any cart.");
	}
	return context;
};

export default useCart