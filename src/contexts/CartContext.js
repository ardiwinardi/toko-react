import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import cartService from 'services/cart'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { formatNumber } from 'utils/number'
export const CartContext = createContext()

export default function CartContextProvider({ children }) {
  const history = useHistory()
  const [carts, setCarts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function getData() {
    setIsLoading(true)
    const data = await cartService.getAll()
    setCarts(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  const addToCart = async (product) => {
    try {
      await cartService.add(product)
      getData()
      document.querySelector('body').scrollIntoView({
        behavior: 'smooth',
      })
    } catch (err) {
      if (err.response.status === 401) {
        history.push({
          pathname: '/login',
          state: { message: 'Silakan login terlebih dahulu' },
        })
      }
    }
  }

  const removeCart = async (cart) => {
    if (cart.quantity === 1) {
      confirmAlert({
        title: 'Delete Cart',
        message: 'Are you sure to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              await cartService.remove(cart)
              getData()
            },
          },
          {
            label: 'No',
            onClick: () => {},
          },
        ],
      })
    } else {
      await cartService.update(
        {
          quantity: cart.quantity - 1,
        },
        cart.id,
      )
      getData()
    }
  }

  const getTotalAmount = () => {
    let totalAmount = carts.reduce(
      (acc, cart) => acc + cart.product.price * cart.quantity,
      0,
    )
    return formatNumber(totalAmount)
  }

  const getTotalQuantity = () => {
    return carts.reduce((acc, cart) => acc + cart.quantity, 0)
  }

  const handleEditQuantity = (operation, cart) => {
    if (operation === '+') {
      addToCart(cart.product)
    } else {
      removeCart(cart)
    }
  }

  return (
    <CartContext.Provider
      value={{
        carts,
        isLoading,
        getCart: getData,
        addToCart,
        getTotalAmount,
        getTotalQuantity,
        handleEditQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

CartContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
