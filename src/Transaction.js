import ListTransactions from './components/ListTransactions'
import useTransactions from './hooks/useTransactions'

export default function Transaction() {
  const [transactions, isLoading] = useTransactions()

  return (
    <>
      <h3>My Transactions</h3>
      <ListTransactions transactions={transactions} isLoading={isLoading} />
    </>
  )
}
