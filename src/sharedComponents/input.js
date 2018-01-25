import React from 'react'

const Input = ({
  placeholder,
  value,
  onChange,
  disabled,
  errorMessage
}) => (
  <React.Fragment>
    <input
      className={`form-control ${errorMessage && 'is-invalid'}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    { errorMessage &&
      <div className="invalid-feedback">
        {errorMessage}
      </div>
    }
  </React.Fragment>
)

export default Input
