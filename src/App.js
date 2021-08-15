import TopNavigation from "./components/TopNavigation";
import "styles/styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Transaction from "./Transaction";
import Account from "./Account";
import Carts from "./Carts";
import DetailProduct from "./DetailProduct";
import Login from "./Login";
import CartContextProvider from "./contexts/CartContext";
import AuthContextProvider from "contexts/AuthContext";
export default function App() {
  return (
    <Router>
      <AuthContextProvider>
        <CartContextProvider>
          <TopNavigation />
          <div className="App">
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:slug" component={DetailProduct} />
            <Route exact path="/transactions" component={Transaction} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/carts" component={Carts} />
            <Route exact path="/login" component={Login} />
          </div>
        </CartContextProvider>
      </AuthContextProvider>
    </Router>
  );
}
