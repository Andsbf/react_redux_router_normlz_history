import React from 'react'
import './loading.css'
const Loading = ({width, color, margin}) => {
  const style = {
    spinner: {
      width: width || '54px',
      margin: margin || '10px auto 10px'

    },
    bounce: {
      backgroundColor: color || '#1f73ab',
      width: `${width/3 || 18}px`,
      height:`${width/3 || 18}px`
    }
  }

  return (
    <div className="spinner" style={style.spinner}>
      <div className="bounce1" style={style.bounce}></div>
      <div className="bounce2" style={style.bounce}></div>
      <div className="bounce3" style={style.bounce}></div>
    </div>
  )
}

export default Loading
