import { useState, useEffect } from 'react'
import productService from 'services/product'

export default function useProduct(slug) {
  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getBySlug = async (slug) => {
    setIsLoading(true)
    const data = await productService.getBySlug(slug)
    setProduct(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getBySlug(slug)
  }, [slug])

  return [product, isLoading]
}
