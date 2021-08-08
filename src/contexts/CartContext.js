import { createContext, useEffect, useState } from "react";
export const CartContext = createContext();

export default function CartContextProvider(props) {
  const [carts, setCarts] = useState([]);

  async function getData() {
    const response = await fetch("http://localhost:3000/carts");
    const json = await response.json();
    setCarts(json.data);
  }

  useEffect(() => {
    getData();
  }, []);

  const addToCart = async (product) => {
    await fetch("http://localhost:3000/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_id: "",
        order_id: "",
        product_id: product.id,
        quantity: 1,
        status: 0,
      }),
    });
    getData();
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

  useEffect(() => {}, [carts]);

  return (
    <CartContext.Provider
      value={{
        carts,
        addToCart,
        removeCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
