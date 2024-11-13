export enum ItemTypeEnum {
	wonton = "wonton",
	dip = "dip",
	drink = "drink",
}

// API

export type url = string;
export type apiKey = string;

// Menu

export type ItemsContextType = {
	menuItems: ItemType[];
	wontons: WontonsType[];
	dips: DipsType[];
	drinks: DrinksType[];
	setMenuItems: (items: ItemType[]) => void;
};

export interface ItemType {
	id: number;
	type: ItemTypeEnum;
	name: string;
	description: string;
	ingredients: string[];
	price: number;
}

export type WontonsType = ItemType;
export type DipsType = Omit<ItemType, "ingredients">;
export type DrinksType = Omit<ItemType, "ingredients">;

export type WotonItemProps = {
	item: WontonsType;
};

export type SideItemProps = {
	item: DipsType | DrinksType;
};

// Cart

export type CartItemType = WontonsType | DrinksType | DipsType | ItemType;

export type CartItem = CartItemType & {
	quantity: number;
};

export type CartItemProps = {
	item: CartItem;
};


export interface CartContextType {
	cartItems: CartItem[];
	totalPrice: number;
	totalPriceWithTax: number;
	totalItemsCount: number;
	addToCart: (item: CartItemType) => void;
	removeFromCart: (id: number) => void;
	clearCart: () => void;
}

// Orders
export type Order = {
  id: string;
  items: number[]; 
  orderValue: number;
  eta: string;
  timestamp: string;
  state: string;
};

export type OrderContextType = {
	allOrders: Order[];
	currentOrderId: string;
	currentOrder: Order;
	orderReceipt: orderReceiptType;
	fetchReceipt: (orderId: string) => Promise<void>;
	fetchAllOrders: () => Promise<void>;
	fetchOrder: (orderId: string) => Promise<void>;
	postOrder: () => Promise<void>;
};

export type orderReceiptItem = {
	id: number;
	name: string;
	type: string;
	quantity: number;
	price: number;
};
export type orderReceiptType = {
	id: string;
	orderValue: number;
	timestamp: string;
	items: orderReceiptItem[];
};