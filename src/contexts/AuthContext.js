import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import { NotificationManager, NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

import { useHistory } from 'react-router-dom'
import authService from 'services/auth'
export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
  const history = useHistory()
  const [me, setMe] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function getMe() {
    setIsLoading(true)
    const data = await authService.getMe()
    setMe(data)
    setIsLoading(false)
  }

  async function signIn(data) {
    const resp = await authService.signin(data)
    if (resp) {
      NotificationManager.success('Login Success', 'Success')
      localStorage.setItem('token', resp.token)
      await getMe()
      history.goBack()
    }
  }

  async function signOut() {
    localStorage.removeItem('token')
    await getMe()
    NotificationManager.success('Logout Success', 'Success')
    history.push('/')
  }

  useEffect(() => {
    getMe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        me,
        getMe,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
      <NotificationContainer />
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}
