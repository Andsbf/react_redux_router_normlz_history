import React from 'react'

const iconMap = {
  'pencil': 'pencil-alt',
  'exclamation-triangle': 'exclamation-triangle',
  'plus': 'plus',
  'arrow-left': 'arrow-left',
  'cross': 'times'
}

const Icon = ({width, color, type}) => {
  const style = {
    width:`${width || 16}px`,
    color: color || 'black'
  }

  return <i className={`fas fa-${iconMap[type]}`} style={style}></i>
}

export default Icon
