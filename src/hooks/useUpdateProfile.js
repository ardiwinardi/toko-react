import { useState } from 'react'
import userServices from 'services/user'

export default function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false)

  const updateProfile = async (data) => {
    setIsLoading(true)
    await userServices.update(data)
    setIsLoading(false)
  }

  return [updateProfile, isLoading]
}
