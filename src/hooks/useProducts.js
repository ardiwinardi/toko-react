import { useState, useEffect } from 'react'
import productService from 'services/product'

export default function useProducts() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [filter, setFilter] = useState({
    category: '',
    limit: '8',
  })

  const getAll = async (filter) => {
    setIsLoading(true)
    const data = await productService.getAll(filter)
    setProducts(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getAll(filter)
  }, [filter])

  return { products, isLoading, filter, setFilter }
}
