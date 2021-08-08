import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export default function ListCarts() {
  const { carts, addToCart, removeCart } = useContext(CartContext);

  const getTotalAmount = (carts) => {
    let totalAmount = carts.reduce(
      (acc, cart) => acc + cart.price * cart.quantity,
      0
    );
    return totalAmount.toFixed(2);
  };

  const handleEditQuantity = (operation, product) => {
    //  === membandingkan secara identic, contoh 0 === '0' => false
    // == membandingkan secara tidak identic, contoh 0 == '0' => true
    // = assignment
    if (operation === "+") {
      addToCart(product);
    } else {
      removeCart(product);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th colSpan="2">Title</th>
          <th>Price</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {carts.map((product, index) => (
          <tr key={index}>
            <td>
              <img src={product.image} width="30px" alt="" />
            </td>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>
              <button
                type="button"
                onClick={() => handleEditQuantity("+", product)}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => handleEditQuantity("-", product)}
              >
                -
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>Total</td>
          <td colSpan={2}>{getTotalAmount(carts)}</td>
        </tr>
      </tfoot>
    </table>
  );
}
