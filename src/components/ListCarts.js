import useCheckout from 'hooks/useCheckout'
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { AuthContext } from 'contexts/AuthContext'
import { formatNumber } from 'utils/number'
import { confirmAlert } from 'react-confirm-alert'
import CustomUI from './confirm-alert/CustomUI'

export default function ListCarts() {
  const {
    carts,
    getCart,
    getTotalAmount,
    getTotalQuantity,
    handleEditQuantity,
  } = useContext(CartContext)

  const [handleCheckout, isLoading] = useCheckout()
  const { me } = useContext(AuthContext)

  const onCheckout = () => {
    confirmAlert({
      title: 'Konfirmasi',
      message: (
        <>
          <strong>Pastikan alamat pengiriman sudah sesuai?</strong>
          <div>{me.name}</div>
          <div>{me.email}</div>
          <div>{me.address}</div>
        </>
      ),
      buttons: [
        {
          label: 'Lanjutkan',
          className: 'btn btn-success',
          onClick: async () => {
            await handleCheckout()
            getCart()
          },
        },
      ],
      customUI: CustomUI,
    })
  }

  return (
    <div className="table-responsive">
      <table className="table table-vcenter card-table">
        <thead>
          <tr>
            <th width="30%" colSpan="2">
              Product
            </th>
            <th width="20%">Price</th>
            <th width="20%">Quantity</th>
            <th width="20%">Total</th>
            <th>
              {me && (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={onCheckout}
                >
                  {isLoading ? 'Loading' : 'Checkout'}
                </button>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart) => (
            <tr key={cart.id}>
              <td>
                <img src={cart.product?.image} width="50px" alt="" />
              </td>
              <td>{cart.product?.name}</td>
              <td>{formatNumber(cart.product?.price)}</td>
              <td>{formatNumber(cart.quantity)}</td>
              <td>{formatNumber(cart.product?.price * cart.quantity)}</td>
              <td>
                <div className="btn-list">
                  <button
                    type="button"
                    className="btn btn-icon"
                    onClick={() => handleEditQuantity('+', cart)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="btn btn-icon"
                    onClick={() => handleEditQuantity('-', cart)}
                  >
                    -
                  </button>
                </div>
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
              <td colSpan={3}>{getTotalAmount()}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}
