import { useState, useEffect } from "react";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // dipanggil saat petama kali render
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json.data);
      })
      .then(() => setIsLoading(false));
  }, []);

  return [categories, isLoading];
}
