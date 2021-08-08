import { useState, useEffect } from "react";

export default function useProducts({ defaultCategory, defaultLimit }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState({
    category: defaultCategory,
    limit: defaultLimit
  });

  const getAllProducts = () => {
    setIsLoading(true);
    fetch(`https://fakestoreapi.com/products?limit=${filter.limit}`)
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .then(() => setIsLoading(false));
  };

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, []);

  // dipanggil saat ada perubahan pada filter
  useEffect(() => {
    if (filter.category) {
      setIsLoading(true);
      fetch(`https://fakestoreapi.com/products/category/${filter.category}`)
        .then((res) => res.json())
        .then((json) => setProducts(json))
        .then(() => setIsLoading(false));
    } else {
      getAllProducts();
    }
    // eslint-disable-next-line
  }, [filter]);

  return [products, filter, setFilter, isLoading];
}
