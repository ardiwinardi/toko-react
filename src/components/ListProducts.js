import { Link } from "react-router-dom";

export default function ListProducts({
  products = [],
  addToCart = () => {},
  isLoading = false
}) {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="2">Title</th>
          <th>Price</th>
          <th width="90px"></th>
          <th width="90px"></th>
        </tr>
      </thead>
      <tbody>
        {isLoading && (
          <tr>
            <td colSpan={4} align="center">
              Loading Product ...{" "}
            </td>
          </tr>
        )}
        {!isLoading &&
          products.map((product, index) => (
            <tr key={index}>
              <td>
                <img src={product.image} width="30px" alt="" />
              </td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <Link to={`/product/${product.id}`}>
                  <button type="button">Show Detail</button>
                </Link>
              </td>
              <td>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
