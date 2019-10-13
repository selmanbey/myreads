import React, { useContext } from 'react'
import * as BooksAPI from '../BooksAPI'
import Image from './../assets/unavailablecover.png'
import BookContext from '../contexts/BookContext'
import styled from 'styled-components'
import arrowSVG from './../assets/icons/arrow-drop-down.svg'

interface Props {
  bookObject: {
    id: string,
    shelf: string,
    title: string,
    authors?: Array<string>,
    imageLinks?: {
      smallThumbnail?: string
    }
  }
}

const Book: React.FC<Props> = (props) => {
  const bookCtx = useContext(BookContext)
  let { bookObject } = props

  function handleSelect(shelf:string) {
    // updates the in-memory database, updates context, refreshes the app
    BooksAPI.update(bookObject, shelf).then(
      (returnedBooks) => {
        let id = bookObject.id
        bookCtx.updateBookShelves(returnedBooks, id, shelf)
        bookCtx.refreshPage()
      }
    )
  }

  let author;
  if( !bookObject.authors || bookObject.hasOwnProperty("error")) {
    // Checks if there is proper data in booksInTheShelf (to prevent crashes)
    // Checks if there is more than one author for the book
  } else {
      if (bookObject.authors.length > 1) {
        author = bookObject.authors[0] + " et al."
      } else {
        author = bookObject.authors[0]
      }
  }

  let bgImage;
  if( bookObject.imageLinks ) {
    if( bookObject.imageLinks.smallThumbnail ) {
      bgImage = bookObject.imageLinks.smallThumbnail
    }
  } else {
    bgImage = Image
  }

  const Book = styled.div`width: 140px;`
  const BookTop = styled.div`
    position: relative;
    height: 200px;
    display: flex;
    align-items: flex-end;
  `
  const BookCover = styled.div`
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    background: #eee;
    width: 128px;
    height: 193px;
    background-image: url(${ (props:{img:any}) => props.img })
  `

  const ShelfChanger = styled.div`
    position: absolute;
    right: 0;
    bottom: -10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #60ac5d;
    background-image: url(${ arrowSVG });
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

    > select {
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  `

  const BookTitle = styled.div`
    font-size: 0.8em;
    margin-top: 10px;
  `

  const BookAuthors = styled.div`
    font-size: 0.8em;
  `
  return (
      <Book>
        <BookTop>
          <BookCover img={ bgImage } ></BookCover>
          <ShelfChanger>
            <select 
              value={ bookObject.shelf } 
              onChange={ (e) => handleSelect(e.target.value) }>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </ShelfChanger>
        </BookTop>
        <BookTitle>{ bookObject.title }</BookTitle>
        <BookAuthors>{ author }</BookAuthors>
      </Book>
  )

}

export default Book
