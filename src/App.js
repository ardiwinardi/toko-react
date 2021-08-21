import React, { Suspense } from 'react'
import TopNavigation from './components/TopNavigation'
import 'styles/styles.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AuthContextProvider from 'contexts/AuthContext'
import CartContextProvider from 'contexts/CartContext'

const Home = React.lazy(() => import('./Home'))
const Transaction = React.lazy(() => import('./Transaction'))
const Account = React.lazy(() => import('./Account'))
const Carts = React.lazy(() => import('./Carts'))
const DetailProduct = React.lazy(() => import('./DetailProduct'))
const Login = React.lazy(() => import('./Login'))

export default function App() {
  return (
    <Router>
      <AuthContextProvider>
        <CartContextProvider>
          <TopNavigation />
          <div className="App">
            <Suspense fallback={<>Loading...</>}>
              <Route exact path="/" component={Home} />
              <Route exact path="/product/:slug" component={DetailProduct} />
              <Route exact path="/transactions" component={Transaction} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/carts" component={Carts} />
              <Route exact path="/login" component={Login} />
            </Suspense>
          </div>
        </CartContextProvider>
      </AuthContextProvider>
    </Router>
  )
}
