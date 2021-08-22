import Header from './Header'
import PropTypes from 'prop-types'
import Navigation from './Navigation'

const Layout = (props) => {
  return (
    <div className="wrapper">
      <Header />
      <Navigation />
      <div className="page-wrapper">{props.children}</div>
    </div>
  )
}
Layout.propTypes = {
  children: PropTypes.element.isRequired,
}
export default Layout
