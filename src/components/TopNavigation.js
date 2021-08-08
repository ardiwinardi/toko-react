import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

export default function TopNavigation() {
  const { carts } = useContext(CartContext);

  const getTotalQuantity = (carts) => {
    // let total = 0;
    // for (var x = 0; x < carts.length; x++) {
    //   total += carts[x].quantity;
    // }
    // return total;

    return carts.reduce((acc, cart) => acc + cart.quantity, 0);
  };
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/transactions">Transaction</Link>
      </li>
      <li>
        <Link to="/account">Account</Link>
      </li>
      <li
        style={{
          float: "right"
        }}
      >
        <Link to="/carts" className="active">
          Carts ({getTotalQuantity(carts)})
        </Link>
      </li>
    </ul>
  );
}
