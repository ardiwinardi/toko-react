import { createContext, useEffect, useState } from "react";
export const CartContext = createContext();

export default function CartContextProvider(props) {
  const [carts, setCarts] = useState(function () {
    let carts = localStorage.getItem("carts");
    return carts ? JSON.parse(carts) : [];
  });

  const addToCart = (product) => {
    if (carts.length === 0) {
      carts.push({
        ...product,
        quantity: 1
      });
    } else {
      const index = carts.findIndex((cart) => cart.id === product.id);
      // jika ditemukan maka [0 - dst]
      // jika tidak ditemukan -1
      if (index >= 0) {
        carts[index].quantity += 1;
      } else {
        carts.push({
          ...product,
          quantity: 1
        });
      }
    }
    setCarts([...carts]);
  };

  const removeCart = (cart) => {
    const index = carts.findIndex((c) => c.id === cart.id);
    // jika ditemukan maka [0 - dst]
    // jika tidak ditemukan -1
    if (index >= 0) {
      carts[index].quantity -= 1;
    }

    if (carts[index].quantity < 1) {
      let confirm = window.confirm(
        "Apakah Anda ingin menghapus produk ini dari keranjang?"
      );

      if (confirm) {
        // menghapus elemen dari array berdasarkan indexnya
        carts.splice(index, 1);
      } else {
        carts[index].quantity = 1;
      }
    }

    setCarts([...carts]);
  };

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

  return (
    <CartContext.Provider
      value={{
        carts,
        addToCart,
        removeCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
