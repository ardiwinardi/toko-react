import { CartContext } from 'contexts/CartContext'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import PropTypes from 'prop-types'

function ListProducts({ products, isLoading }) {
  const { addToCart } = useContext(CartContext)

  return (
    <>
      <div className="container-xl">
        <div className="row row-cards">
          {isLoading && 'Loading products... '}
          {!isLoading &&
            products.map((product) => (
              <div className="col-6 col-lg-3" key={product.id}>
                <div className="card card-sm">
                  <Link to={`/product/${product.slug}`} className="d-block">
                    <img src={product.image} className="card-img-top" />
                  </Link>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <div>{product.name}</div>
                        <div className="text-muted">Rp. {product.price}</div>
                      </div>
                      <div className="ms-auto">
                        <span className="badge">{product.category?.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex">
                      <button
                        type="button"
                        className="btn btn-primary ms-auto"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

ListProducts.propTypes = {
  products: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
}
export default ListProducts
