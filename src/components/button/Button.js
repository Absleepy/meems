import React from 'react'

const Button = ({onClick,text,className}) => {
    return (
        <div className="btn-container my-3 text-right">
        <button onClick={onClick} className={`btn myBtn text-white ${className}`}>
          {text}
        </button>
      </div>
    )
}

export default Button
