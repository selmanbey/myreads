import React, { useContext } from 'react'
import Book from './Book'
import BookContext from '../contexts/BookContext'
import styled from 'styled-components'

interface Props {
  name: string
}

const Shelf = styled.div`
  padding: 0 10px 20px

  @media (min-width: 600px) {
    padding: 0 20px 40px;
  }
`
const STitle = styled.h2`border-bottom: 1px solid #dedede;`

const SBooks = styled.div`text-align: center;`

export const BookGrid = styled.ol`
  list-style-type: none;
  padding: 0;
  margin: 0;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  > li {
    padding: 10px 15px;
    text-align: left;
  }
`

const Bookshelf:React.SFC<Props> = (props) => {
  const bookCtx = useContext(BookContext)

  let componentTitle = ""
  if (props.name === "currentlyReading") { componentTitle = "Currently Reading" }
  if (props.name === "wantToRead") { componentTitle = "Want To Read" }
  if (props.name === "read") { componentTitle = "Read" }

  let booksInTheShelf = bookCtx.shelves[props.name]

  let template:Array<JSX.Element> = [];

  for(let index in booksInTheShelf) {
      template.push(
      <li key={ index } >
        <Book
          bookObject = { booksInTheShelf[index] }
          />
      </li>)
  }
  
  return (
    <Shelf>
      <STitle> { componentTitle } </STitle>
      <SBooks>
        <BookGrid>{ template }</BookGrid>
      </SBooks>
    </Shelf>
  )
}

export default Bookshelf