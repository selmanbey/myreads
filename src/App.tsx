import React, { useState, useEffect, useContext } from 'react'
import { Route } from 'react-router-dom'
import Search from './components/Search'
import MyBooks from './components/MyBooks'
import BookContext from './contexts/BookContext'
import plusSign from './assets/icons/add.svg'
import backArrow from './assets/icons/arrow-back.svg'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body, .root {
    height: 100%;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
  }

  .open-search {
    position: fixed;
    right: 25px;
    bottom: 25px;
  }
  
  .open-search a {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #2e7d32;
    background-image: url(${ plusSign });
    background-repeat: no-repeat;
    background-position: center;
    background-size: 28px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    font-size: 0;
  }
  
  .close-search {
    display: block;
    top: 20px;
    left: 15px;
    width: 50px;
    height: 53px;
    background: white;
    background-image: url(${ backArrow });
    background-position: center;
    background-repeat: no-repeat;
    background-size: 28px;
    font-size: 0;
  }
`

const BooksApp:React.FC = () => {
  let bookCtx = useContext(BookContext)

  return (
    <div id={ bookCtx.needsRefreshing.toString() } className="app">
      <GlobalStyle />
      <Route exact path="/" render={ () => ( 
        bookCtx.isLoading ? 
        <h1> { bookCtx.message } </h1> :
        <MyBooks />
      )} />

      <Route path="/create" component={ Search }/>
    </div>
  )
}

export default BooksApp
