import ListCarts from './components/ListCarts'

export default function Carts() {
  return (
    <>
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <h2 className="page-title">Carts</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-cards">
            <div className="col-12">
              <div className="card">
                <ListCarts />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
