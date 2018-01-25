import React from 'react'

const RadioInput = ({checked, onChange, disabled, label}) => (
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      value="1"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <label className="form-check-label" htmlFor="exampleRadios1">
      { label }
    </label>
  </div>
)

export default RadioInput
