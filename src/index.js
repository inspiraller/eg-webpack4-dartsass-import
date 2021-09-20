import './index.scss'
import React from 'react'
import ReactDom from 'react-dom'

const AppContainer = () => {
  return (
    <p>Hello world</p>
  )
}

ReactDom.render(<AppContainer />, document.getElementById('root'))
