import PropTypes from 'prop-types'
import 'styles/dialog.css'

const CustomUI = ({ title, buttons, onClose, message }) => {
  return (
    <div id="popup1" className="overlay">
      <div className="popup">
        <h2>{title}</h2>
        <a
          className="close"
          href="/"
          onClick={(e) => {
            e.preventDefault()
            onClose()
          }}
        >
          &times;
        </a>
        <div className="content">{message}</div>
        {buttons.map((btn, index) => (
          <button
            type="button"
            className={btn.className}
            onClick={() => {
              btn.onClick(), onClose()
            }}
            key={index}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}

CustomUI.propTypes = {
  title: PropTypes.string,
  message: PropTypes.any.isRequired,
  buttons: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default CustomUI
