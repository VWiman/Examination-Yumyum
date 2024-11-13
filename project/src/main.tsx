import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ItemsProvider } from "./context/ItemsContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { OrdersProvider } from "./context/OrdersContext.tsx";

createRoot(document.getElementById("root")!).render(
	<ItemsProvider>
		<CartProvider>
			<OrdersProvider>
				<BrowserRouter
					future={{
						v7_relativeSplatPath: true,
						v7_startTransition: true,
					}}>
					<App />
				</BrowserRouter>
			</OrdersProvider>
		</CartProvider>
	</ItemsProvider>
);
