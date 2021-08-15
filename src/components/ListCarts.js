import PropTypes from "prop-types";
import useCheckout from "hooks/useCheckout";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

import { confirmAlert } from "react-confirm-alert"; // Import
import "styles/dialog.css";
import { AuthContext } from "contexts/AuthContext";

export default function ListCarts() {
  const {
    carts,
    getCart,
    getTotalAmount,
    getTotalQuantity,
    handleEditQuantity,
  } = useContext(CartContext);

  const [handleCheckout, isLoading] = useCheckout();
  const { me } = useContext(AuthContext);

  const ConfirmDialog = ({ onClose }) => {
    return (
      <div id="popup1" className="overlay">
        <div className="popup">
          <h2>Konfirmasi</h2>
          <a
            className="close"
            href="/carts"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            &times;
          </a>
          <div className="content">
            <strong>Pastikan alamat pengiriman sudah sesuai?</strong>
            <div>{me.name}</div>
            <div>{me.email}</div>
            <div>{me.address}</div>
          </div>
          <button
            type="button"
            className="btn"
            onClick={async () => {
              await handleCheckout();
              getCart();
              onClose();
            }}
          >
            Lanjutkan
          </button>
        </div>
      </div>
    );
  };
  ConfirmDialog.propTypes = {
    onClose: PropTypes.any,
  };

  const onCheckout = () => {
    confirmAlert({
      customUI: ConfirmDialog,
    });
  };

  return (
    <div className="content">
      <table className="styled-table">
        <thead>
          <tr>
            <th width="30%" colSpan="2">
              Title
            </th>
            <th width="20%">Price</th>
            <th width="20%">Quantity</th>
            <th width="20%">Total</th>
            <th>
              {me && (
                <button type="button" className="btn" onClick={onCheckout}>
                  {isLoading ? "Loading" : "Checkout"}
                </button>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart, index) => (
            <tr key={index}>
              <td>
                <img src={cart.product?.image} width="30px" alt="" />
              </td>
              <td>{cart.product?.name}</td>
              <td>{cart.product?.price}</td>
              <td>{cart.quantity}</td>
              <td>{cart.product?.price * cart.quantity}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-icon"
                  onClick={() => handleEditQuantity("+", cart)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn btn-icon"
                  onClick={() => handleEditQuantity("-", cart)}
                >
                  -
                </button>
              </td>
            </tr>
          ))}
          {carts.length === 0 && (
            <tr>
              <td colSpan={5} align="center">
                Data tidak tersedia
              </td>
            </tr>
          )}
        </tbody>

        {carts.length > 0 && (
          <tfoot>
            <tr>
              <td></td>
              <td colSpan={2}>
                <strong>Total</strong>
              </td>
              <td>{getTotalQuantity()}</td>
              <td>{getTotalAmount()}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
