import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Icon } from '.'
import { appClearError } from '../root/actions'

const style = {
  toaster: {
    backgroundColor: 'rgba(248, 215, 218, 0.9)',
    top: '25%',
    margin: '0 auto',
    display: 'inline-block'
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(130, 130, 130, 0.6)',
    position: 'absolute',
    left: '0',
    top: '0',
    textAlign: 'center',
    zIndex: '999'
  },
  cross: {
    cursor: 'pointer'
  }
};

class Toaster extends Component {
  render() {
    const { errorMessage } = this.props

    if (!errorMessage) return null;

    return (
      <div style={style.overlay}>
        <div style={style.toaster} className="alert alert-danger" role="alert">
          {this.props.errorMessage} &nbsp;
          <span style={style.cross} onClick={this.props.clearError}>
            <Icon  type="cross" color="#721c24" />
          </span>
        </div>
      </div>
    )
  }
}

Toaster.propTypes = {
  errorMessage: PropTypes.string
};

const mapStateToProps = (state) => ({
  errorMessage: state.app.errorMessage
})

const mapDispatchToProps = (dispatch) => {
  return ({
    clearError() { dispatch(appClearError()) }
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(Toaster)
