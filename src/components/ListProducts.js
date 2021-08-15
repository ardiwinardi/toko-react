import { CartContext } from "contexts/CartContext";
import useProducts from "hooks/useProducts";
import { Link } from "react-router-dom";
import { useContext } from "react";
import useCategories from "hooks/useCategories";

import "styles/product.css";

export default function ListProducts() {
  const [products, isLoading, filter, setFilter] = useProducts({
    defautCategory: "",
    defaultLimit: 6,
  });
  const { addToCart } = useContext(CartContext);
  const [categories, isLoadingCategories] = useCategories();

  return (
    <>
      <div
        style={{
          padding: "0px 20px",
        }}
      >
        <label>
          Kategori : {isLoadingCategories && "Loading Categories ..."}
          {!isLoadingCategories && (
            <select
              onChange={(e) =>
                setFilter((filter) => ({
                  ...filter,
                  category: e.target.value,
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
                  limit: e.target.value,
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

      <div className="row product-container">
        {isLoading && "Loading products... "}
        {!isLoading &&
          products.map((product) => (
            <div className="col-30" key={product.id}>
              <div className="product-card">
                <div className="product-image">
                  <img src={product.image} />
                </div>
                <div className="product-details">
                  <h1>
                    <Link to={`/product/${product.slug}`}>{product.name}</Link>
                  </h1>
                  <p>Rp. {product.price}</p>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
