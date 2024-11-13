import { createContext, ReactElement, ReactNode, useState, useMemo } from "react";
import { CartContextType, CartItem, CartItemType } from "../types";

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }): ReactElement => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	// Function to add an item to the cart
	const addToCart = (item: CartItemType) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);

			if (existingItem) {
				// Increase quantity if the item already exists
				return prevItems.map((cartItem) =>
					cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
				);
			} else {
				// Add new item with quantity 1 if it doesn't exist
				return [...prevItems, { ...item, quantity: 1 }];
			}
		});
	};

	// Remove an item from the cart using id
	const removeFromCart = (id: number) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((cartItem) => cartItem.id === id);

			if (existingItem && existingItem.quantity > 1) {
				// Decrease quantity if more than one item
				return prevItems.map((cartItem) =>
					cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
				);
			} else {
				// Remove item if last item
				return prevItems.filter((cartItem) => cartItem.id !== id);
			}
		});
	};

	const clearCart = () => {
		setCartItems([]);
	};

	const totalPrice = useMemo(() => {
		return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	}, [cartItems]);

	const totalPriceWithTax = useMemo(() => totalPrice * 1.2, [totalPrice]);

	const totalItemsCount = useMemo(() => {
		return cartItems.reduce((count, item) => count + item.quantity, 0);
	}, [cartItems]);

	return (
		<CartContext.Provider
			value={{
				cartItems,
				totalPrice,
				totalPriceWithTax,
				totalItemsCount,
				addToCart,
				removeFromCart,
				clearCart,
			}}>
			{children}
		</CartContext.Provider>
	);
};


export { CartProvider, CartContext };
