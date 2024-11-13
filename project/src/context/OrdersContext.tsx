import { createContext, useState, ReactNode, ReactElement, useEffect } from "react";
import { OrderContextType, Order, orderReceiptType } from "../types";
import useCart from "../hooks/useCart";

const OrdersContext = createContext<OrderContextType | undefined>(undefined);

const OrdersProvider = ({ children }: { children: ReactNode }): ReactElement => {
	const [allOrders, setAllOrders] = useState<Order[]>([]);
	const [currentOrderId, setCurrentOrderId] = useState<string>("");
	const [orderReceipt, setOrderReceipt] = useState<orderReceiptType>({
		id: "",
		orderValue: 0,
		timestamp: "",
		items: [
			{
				id: 0,
				name: "",
				type: "",
				quantity: 0,
				price: 0,
			},
		],
	});
	const [currentOrder, setCurrentOrder] = useState<Order>({
		id: "",
		items: [],
		orderValue: 0,
		eta: "0",
		timestamp: "",
		state: "",
	});
	const { cartItems, clearCart } = useCart();

	// GET settings
	const settings = {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"x-zocom": import.meta.env.VITE_API_KEY,
		},
	};

	// Fetch all orders
	async function fetchAllOrders(): Promise<void> {
		
		try {
			const response: Response = await fetch(
				`${import.meta.env.VITE_URL}/${import.meta.env.VITE_TENANT_ID}/orders`,
				settings
			);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			const result = await response.json();

			if (result && result.orders) {
				setAllOrders(result.orders);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}

	// Fetch order
	async function fetchOrder(orderID: string): Promise<void> {
	
		try {

			const endpoint = `${import.meta.env.VITE_URL}/${import.meta.env.VITE_TENANT_ID}/orders/${orderID}`;

			const response: Response = await fetch(endpoint, settings);

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			const result = await response.json();

			if (result && result.order) {
				setCurrentOrder(result.order);
			} else {
				console.warn("Data missing in result:", result);
			}
		} catch (error) {
			console.error("Error in fetchOrder:", error);
		}
	}

	// Fetch receipt
	async function fetchReceipt(orderID: string): Promise<void> {

		try {

			const endpoint = `${import.meta.env.VITE_URL}/receipts/${orderID}`;

			const response: Response = await fetch(endpoint, settings);

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			const result = await response.json();

			if (result && result.receipt) {
				setOrderReceipt(result.receipt);
			} else {
				console.warn("Data missing in result:", result);
			}
		} catch (error) {
			console.error("Error in fetchOrder:", error);
		}
	}

	// Post order
	async function postOrder(order: { items: number[] }): Promise<void> {
		const settings = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-zocom": import.meta.env.VITE_API_KEY,
			},
			body: JSON.stringify(order),
		};

		try {
			const response: Response = await fetch(
				`${import.meta.env.VITE_URL}/${import.meta.env.VITE_TENANT_ID}/orders`,
				settings
			);

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
			const createdOrder = await response.json();

			setCurrentOrderId(createdOrder.order.id);

			setAllOrders((prevOrders) => [...prevOrders, createdOrder.order]);

			clearCart();
		} catch (error) {
			console.error("Error:", error);
		}
	}

	// Create the order
	async function createOrderFromCart(): Promise<void> {
		if (cartItems.length === 0) {
			console.warn("No items in cart.");
			return;
		}

		const itemIds: number[] = cartItems.flatMap((cartItem) => Array(cartItem.quantity).fill(cartItem.id));

		const newOrder = {
			items: itemIds,
		};

		await postOrder(newOrder);
	}

	useEffect(() => {
		console.log("Current order id: ", currentOrderId);
		console.log("Current order:", currentOrder);
	}, [currentOrderId, allOrders]);

	return (
		<OrdersContext.Provider
			value={{
				allOrders,
				currentOrderId,
				currentOrder,
				orderReceipt,
				fetchReceipt,
				fetchAllOrders,
				fetchOrder,
				postOrder: createOrderFromCart,
			}}>
			{children}
		</OrdersContext.Provider>
	);
};

export { OrdersContext, OrdersProvider };
