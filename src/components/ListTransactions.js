import { format } from 'date-fns'
import useTransactions from 'hooks/useTransactions'
import { formatNumber } from 'utils/number'

export default function ListTransactions() {
  const [transactions, isLoading] = useTransactions()

  return (
    <div className="table-responsive">
      <table className="table table-vcenter card-table table-striped">
        <thead>
          <tr>
            <th width="300px">Date Transaction</th>
            <th>Items</th>
            <th>Total Items</th>
            <th>Total Prices</th>
            <th width="90px">Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3} align="center">
                Loading Transaction ...{' '}
              </td>
            </tr>
          )}
          {!isLoading &&
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>
                  {format(
                    new Date(transaction.createdAt),
                    'dd MMMM yyyy HH:ii',
                  )}
                </td>
                <td>
                  <ul>
                    {transaction.carts.map((cart) => (
                      <li key={cart.id}>{cart.product.name}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {formatNumber(
                    transaction.carts.reduce(
                      (acc, cart) => acc + cart.quantity,
                      0,
                    ),
                  )}
                </td>
                <td>
                  {formatNumber(
                    transaction.carts.reduce(
                      (acc, cart) => acc + cart.quantity * cart.product.price,
                      0,
                    ),
                  )}
                </td>
                <td>{transaction.status}</td>
              </tr>
            ))}

          {transactions.length === 0 && (
            <tr>
              <td colSpan={5} align="center">
                Data tidak tersedia
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
