import { AuthContext } from 'contexts/AuthContext'
import { NavLink, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { CartContext } from 'contexts/CartContext'

const Navigation = () => {
  const location = useLocation()
  const { pathname } = location
  const { me, signOut } = useContext(AuthContext)
  const { getCart } = useContext(CartContext)
  return (
    <div className="navbar-expand-md">
      <div className="collapse navbar-collapse" id="navbar-menu">
        <div className="navbar navbar-light">
          <div className="container-xl">
            <ul className="navbar-nav">
              <li className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
                <NavLink to="/" className="nav-link">
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <polyline points="5 12 3 12 12 3 21 12 19 12" />
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                    </svg>
                  </span>
                  <span className="nav-link-title">Home</span>
                </NavLink>
              </li>
              <li
                className={`nav-item ${
                  pathname === '/transactions' ? 'active' : ''
                }`}
              >
                <NavLink to="/transactions" className="nav-link">
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
                      <line x1="12" y1="12" x2="20" y2="7.5" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <line x1="12" y1="12" x2="4" y2="7.5" />
                      <line x1="16" y1="5.25" x2="8" y2="9.75" />
                    </svg>
                  </span>
                  <span className="nav-link-title">Transactions</span>
                </NavLink>
              </li>
              <li
                className={`nav-item ${pathname === '/carts' ? 'active' : ''}`}
              >
                <NavLink to="/carts" className="nav-link">
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="6" cy="19" r="2" />
                      <circle cx="17" cy="19" r="2" />
                      <path d="M17 17h-11v-14h-2" />
                      <path d="M6 5l14 1l-1 7h-13" />
                    </svg>
                  </span>
                  <span className="nav-link-title">Carts</span>
                </NavLink>
              </li>
            </ul>
            <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
              {me && (
                <NavLink
                  to="/logout"
                  className="btn btn-outline-white"
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.preventDefault()

                    confirmAlert({
                      title: 'Confirm to logout',
                      message: 'Are you sure to do this?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () => {
                            signOut()
                            getCart()
                          },
                        },
                        {
                          label: 'No',
                          onClick: () => {},
                        },
                      ],
                    })
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M7 12h14l-3 -3m0 6l3 -3" />
                  </svg>
                  Logout
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation
