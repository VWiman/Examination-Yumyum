import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Order from "./routes/Order";
import Checkout from "./routes/Checkout";
import Confirmation from "./routes/Confirmation";
import Receipt from "./routes/Receipt";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Order />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route path="/confirmation" element={<Confirmation />} />
				<Route path="/receipt" element={<Receipt />} />
			</Route>
		</Routes>
	);
}

export default App;
