import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "contexts/CartContext";
import { AuthContext } from "contexts/AuthContext";
import { AnimateOnChange } from "react-animation";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default function TopNavigation() {
  const { getCart, getTotalQuantity } = useContext(CartContext);
  const { me, signOut } = useContext(AuthContext);
  const totalQuantity = getTotalQuantity();
  return (
    <>
      <header>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxaR0g7gpULqqHqYQjrOuFPEzjgsKICQQSJEdZoFnwv-SR6DzNNn8Ba5K-x36tu6oMnV8&usqp=CAU" />
        <nav>
          <ul>
            <li>
              <NavLink to="/" activeClassName="selected">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/transactions">My Transactions</NavLink>
            </li>
            {me && (
              <li style={{ float: "right" }}>
                <NavLink
                  to="/logout"
                  onClick={(e) => {
                    e.preventDefault();

                    confirmAlert({
                      title: "Confirm to logout",
                      message: "Are you sure to do this?",
                      buttons: [
                        {
                          label: "Yes",
                          onClick: () => {
                            signOut();
                            getCart();
                          },
                        },
                        {
                          label: "No",
                          onClick: () => {},
                        },
                      ],
                    });
                  }}
                >
                  Logout
                </NavLink>
              </li>
            )}

            <li>
              <NavLink to="/carts">
                <AnimateOnChange
                  animationIn="bounceIn"
                  animationOut="bounceOut"
                  durationOut={500}
                >
                  <div>
                    My Carts{" "}
                    {totalQuantity > 0 ? <>({totalQuantity} Items)</> : ""}
                  </div>
                </AnimateOnChange>
              </NavLink>
            </li>
            {me ? (
              <li style={{ float: "right" }}>
                <NavLink to="/account">
                  <strong>{me.name}</strong>
                </NavLink>
              </li>
            ) : (
              <li style={{ float: "right" }}>
                <NavLink to="/login">Log In</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <p></p>
      </main>
    </>
  );
}
