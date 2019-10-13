import React from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import styled from 'styled-components'

const MyBooks:React.FC = () => {
  const Header = styled.header`
    padding: 10px 0;
    background: #2e7c31;
    text-align: center;

    > h1  {
      font-weight: 400;
      margin: 0;
      color: white;
    }
  `
  
  const Main = styled.main`
    padding: 0 0 80px;
    flex: 1;
  `
  return (
    <div className="list-books">
      <Header>
        <h1>MyReads</h1>
      </Header>
      <Main>
        <Bookshelf
          name="currentlyReading" />
        <Bookshelf
          name="wantToRead" />
        <Bookshelf
          name="read" />
      </Main>
      <div className="open-search">
        <Link to="/create">Add a book</Link>
      </div>
    </div>
  )
}

export default MyBooks
