import { CartItemType } from "../types";
import useCart from "./useCart";

const useHandleAdd = () => {
	const { addToCart } = useCart();

	const handleAdd = (item: CartItemType): void => {
		addToCart(item);
	};

	return handleAdd;
};

export default useHandleAdd;