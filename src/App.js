import TopNavigation from "./components/TopNavigation";
import "./styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Transaction from "./Transaction";
import Account from "./Account";
import Carts from "./Carts";
import DetailProduct from "./DetailProduct";
import CartContextProvider from "./contexts/CartContext";

export default function App() {
  return (
    <Router>
      <CartContextProvider>
        <div className="App">
          <TopNavigation />
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={DetailProduct} />
          <Route exact path="/transactions" component={Transaction} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/carts" component={Carts} />
        </div>
      </CartContextProvider>
    </Router>
  );
}
