import { useState, useEffect } from 'react'
import transactionService from 'services/transaction'

export default function useTransactions() {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAll = async () => {
    setIsLoading(true)
    const data = await transactionService.getAll()
    setTransactions(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getAll()
  }, [])

  return [transactions, isLoading]
}
