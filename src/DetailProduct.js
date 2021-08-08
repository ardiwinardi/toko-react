import { useEffect, useState } from "react";

export default function DetailProduct(props) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${props.match.params.id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, [props.match.params.id]);

  return (
    <>
      <h3>Halaman Detail Product {props.match.params.id}</h3>
      {product && (
        <>
          <img src={product.image} width="120px" alt="" />
          <h4>{product.title}</h4>
          <h4>${product.price}</h4>
        </>
      )}
    </>
  );
}
