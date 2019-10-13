import React, { useState, useEffect, useContext, ChangeEvent } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Book from './Book'
import { BookGrid } from './Bookshelf'
import * as BooksAPI from './../BooksAPI'
import BookContext from './../contexts/BookContext'

interface BookI {
  id: string,
  shelf: string
}

const SearchBar = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 0 6px rgba(0,0,0,0.23);  
`
const InputWrapper = styled.div`  
  flex: 1;
  background: #e9e;

  > input {
    width: 100%;
    padding: 15px 10px;
    font-size: 1.25em;
    border: none;
    outline: none;
  }
`

const Results = styled.div`
  padding: 80px 10px 20px;
`

const NoResult = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50vw;
  margin: 0 auto;
  color: gray;
  text-align: justify
`

const Search:React.FC = () => {
  const bookCtx = useContext(BookContext)
  const [query, setQuery] = useState("")
  const [foundBooks, setFoundBooks] = useState<any[]>([])
 
  useEffect(() => { renderBooks() }, [query]) 


  async function renderBooks() {
    let foundBooks = await BooksAPI.search(query)
    
    if(!foundBooks || foundBooks.error) {
        setFoundBooks([]);
    } else {
      let allBooks = await BooksAPI.getAll()
      let newBooks = checkShelves(allBooks, foundBooks)
      setFoundBooks(newBooks)
    }
  }

  function changeShelf(id:string, shelf:string) {
    let newBooks = foundBooks.map( (book:BookI) => {
      if(book.id === id) {
        book.shelf = shelf
        return book
      } else {
        return book
      }
    })

    setFoundBooks(newBooks)
  }

  function checkShelves(myBooks:any[], searchedBooks:any[]) {
    let hasAnythingChanged = false

    let newBooks = searchedBooks.map( (book) => {
      let idArray = myBooks.map( (mybook) => (mybook.id))

      if (idArray.includes(book.id)) {
          let newBook = myBooks.filter((mybook) => (mybook.id === book.id))[0];
          hasAnythingChanged = true;
          return newBook
      } else {
        return book
      }
    })

    if(hasAnythingChanged) {
      setFoundBooks(newBooks)
    }

    return newBooks
  }

  let template = [];
  for(let book in foundBooks) {
      let bookObject = foundBooks[book]

      foundBooks[book].hasOwnProperty("shelf") ?
      bookObject["shelf"] = foundBooks[book].shelf :
      bookObject["shelf"] = "none"

      template.push(
      <li key = { foundBooks[book].id }>
        <Book
          bookObject= { bookObject }/>
      </li>)
  }
  
  return (
    <div className="search-books">
      <SearchBar>
        <Link className="close-search" to="/" onClick= { bookCtx.refreshPage }> Close </Link>
        <InputWrapper>
          <input type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={ e => setQuery(e.target.value) }/>
        </InputWrapper>
      </SearchBar>
      <Results>
        <BookGrid>
          { query ? template :
            <NoResult>
              This app uses the API and the database provided by Udacity to search and retrieve books.
              Thus, the search is limited to a particular set of search terms.
              You can find these search terms here: &nbsp;
              <a href="https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md"> Search Terms </a>
            </NoResult>
            }
        </BookGrid>
      </Results>
    </div>
  )
}

export default Search
