import { useState, useEffect } from 'react'
import productService from 'services/product'

export default function useProducts({ defaultCategory, defaultLimit }) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [filter, setFilter] = useState({
    category: defaultCategory,
    limit: defaultLimit,
  })

  const getAll = async (filter) => {
    setIsLoading(true)
    const data = await productService.getAll(filter)
    setProducts(data)
    setIsLoading(false)
  }

  // dipanggil saat ada perubahan pada filter
  useEffect(() => {
    getAll(filter)
  }, [filter])

  return [products, isLoading, filter, setFilter]
}
