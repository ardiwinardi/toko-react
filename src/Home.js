import ListProducts from "./components/ListProducts";
import useProducts from "./hooks/useProducts";
import useCategories from "./hooks/useCategories";
import { useContext } from "react";
import { CartContext } from "./contexts/CartContext";

export default function Home() {
  const { addToCart } = useContext(CartContext);

  const [products, filter, setFilter, isLoadingProducts] = useProducts({
    defautCategory: "",
    defaultLimit: 5
  });

  const [categories, isLoadingCategories] = useCategories();

  return (
    <div className="App">
      <div
        style={{
          padding: "12px"
        }}
      >
        <label>
          Kategori : {isLoadingCategories && "Loading Categories ..."}
          {!isLoadingCategories && (
            <select
              onChange={(e) =>
                setFilter((filter) => ({
                  ...filter,
                  category: e.target.value
                }))
              }
            >
              <option value="">Semua Kategori</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </label>{" "}
        {!filter.category && (
          <label>
            Tampilkan :{" "}
            <select
              onChange={(e) =>
                setFilter((filter) => ({
                  ...filter,
                  limit: e.target.value
                }))
              }
              defaultValue={filter.limit}
            >
              <option value="2">2 Produk</option>
              <option value="5">5 Produk</option>
              <option value="10">10 Produk</option>
            </select>
          </label>
        )}
      </div>

      <ListProducts
        products={products}
        isLoading={isLoadingProducts}
        addToCart={addToCart}
      />
    </div>
  );
}
