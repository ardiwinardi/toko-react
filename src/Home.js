import useCategories from 'hooks/useCategories'
import useProducts from 'hooks/useProducts'
import ListProducts from './components/ListProducts'

export default function Home() {
  const { products, isLoading, filter, setFilter } = useProducts()
  const [categories, isLoadingCategories] = useCategories()
  return (
    <>
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <h2 className="page-title">Products</h2>
            </div>
            <div className="col-auto ms-auto d-print-none">
              <div className="d-flex">
                <div className="me-3">
                  {isLoadingCategories && 'Loading Categories ...'}
                  {!isLoadingCategories && (
                    <select
                      className="form-select"
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
                </div>
                <div className="me-3">
                  {!filter.category && (
                    <select
                      className="form-select"
                      onChange={(e) =>
                        setFilter((filter) => ({
                          ...filter,
                          limit: e.target.value,
                        }))
                      }
                      defaultValue={filter.limit}
                    >
                      <option value="8">8 Produk</option>
                      <option value="10">10 Produk</option>
                      <option value="20">20 Produk</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <ListProducts products={products} isLoading={isLoading} />
      </div>
    </>
  )
}
