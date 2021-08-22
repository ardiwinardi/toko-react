import ListTransactions from './components/ListTransactions'

export default function Transaction() {
  return (
    <>
      <div className="container-xl">
        <div className="page-header d-print-none">
          <div className="row align-items-center">
            <div className="col">
              <h2 className="page-title">Transactions</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-cards">
            <div className="col-12">
              <div className="card">
                <ListTransactions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
