import React, { Component } from 'react'
import { Loading } from '.'
import { debounce } from '../lib'

const style = {
  errorMessage: {
    paddingLeft: '10px'
  },
  invalid: {
    borderColor: '#dc3545',
    boxShadow: '0 0 0 0.2rem rgba(220,53,69,.25)'
  },
  error: {
    width: '100%',
    marginTop: '.25rem',
    fontSize: '80%',
    color: '#dc3545'
  }
}

class DropdownSearch extends Component {
  constructor(props) {
    super(props);

    this.onDropdownClick = this.onDropdownClick.bind(this)
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onOptionClick = this.onOptionClick.bind(this)
    this.search = debounce(this.search,1000)
    this.state = {
      open: false,
      selectedOption: null,
      searchChanged: false
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);

    this.setState({selectedOption: this.props.selected})
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.search.cancel()
      this.setState({open: false})
    }
  }

  onDropdownClick() {
    this.setState({open: !this.state.open})
  }

  search(value) {
    this.setState({
      searchChanged: false
    })

    this.props.onSearch(value)
  }
  onInputChange(value) {
    this.setState({searchChanged: true})

    if (value.trim().length < 3) {
      this.search.cancel()
      return
    }

    this.search(value.trim())
  }

  onOptionClick(option) {
    this.props.onSelection(option)
    this.setState({
      open: false,
      selectedOption: option.value
    })
  }

  error() {
    const { isSearching, options } = this.props
    const { searchChanged  } = this.state

    // if there is an ongoing search there is no error
    if (isSearching) return false

    // if there is an ongoing search there is no error
    if (searchChanged) return false

    // if no search has been performed, no error
    if (options === null) return false

    // if we have results no error
    if (options.length) return false

    return true
  }

  render() {
    const {
      placeholder,
      label,
      options,
      searchPlaceholder,
      disabled,
      invalid,
      withEmptyOption
    } = this.props

    return (
      <div className="form-group" ref={this.setWrapperRef}>
        {label && <label htmlFor="exampleInputEmail1">{label}</label> }
        <div className="dropdown">
          <button
            style={invalid && style.invalid}
            className={'btn btn-outline-secondary dropdown-toggle w-100'}
            type="button"
            onClick={ this.onDropdownClick}
            disabled={ disabled || false}
          >
            { this.state.selectedOption || placeholder || 'Select'}
          </button>
          { invalid && !this.state.open &&
            <div style={style.error}>
              Invalid option.
            </div>
          }
          { this.state.open &&
            <div className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
              <input
                className='form-control'
                onKeyUp={this.handleKeyPress}
                onChange={(e) => this.onInputChange(e.target.value)}
                onBlur={this.handleOnBlur}
                autoFocus
                type="text"
                placeholder={ searchPlaceholder || "Please enter 3 or more characters to search"}
              />
              {  this.error() &&
                 <div style={{ ...style.errorMessage, ...style.error }} >
                   No results found.
                 </div>
              }
              { this.props.isSearching ?
                <Loading margin="12px auto 0 auto"/> :
                <React.Fragment>
                  {
                    (options || []).map((option) => (
                      <a
                        className="dropdown-item"
                        key={option.key}
                        onClick={() => this.onOptionClick(option)}
                        >
                        {option.value}
                      </a>
                    ))
                  }
                { withEmptyOption &&
                  <a
                    className="dropdown-item"
                    key={null}
                    onClick={() => this.onOptionClick({id: null, value: null})}
                  >
                    &nbsp;
                  </a>
                }
                </React.Fragment>
              }
            </div>
          }
        </div>
      </div>
    )
  }
}

export default DropdownSearch
