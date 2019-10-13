import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { BookProvider } from './contexts/BookContext'
import App from './App'

ReactDOM.render(
  <BrowserRouter>
    <BookProvider>
      <App />
    </BookProvider>
  </BrowserRouter>,
  document.getElementById('root'))
