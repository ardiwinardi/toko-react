import { useState, useEffect } from 'react'
import categoryService from 'services/category'

export default function useCategories() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAll = async (filter) => {
    setIsLoading(true)
    const data = await categoryService.getAll(filter)
    setCategories(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getAll()
  }, [])

  return [categories, isLoading]
}
