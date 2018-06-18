import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import Book from './book'
import Bookshelf from './bookshelf'
import * as BooksAPI from './BooksAPI'


class MyBooksPage extends Component {
  static propTypes = {
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired
  }

  // state = {
  //   currentlyReading: [],
  //   wantToRead: [],
  //   read: []
  // }

  // arrangeBooksToShelves(currentlyReading, wantToRead, read) {
  //   let books = this.props.books;
  //
  //   for (let book in books) {
  //       if (books[book].shelf === "currentlyReading") {
  //         currentlyReading.push(books[book])
  //       } else if (books[book].shelf === "wantToRead") {
  //         wantToRead.push(books[book])
  //       } else if (books[book].shelf === "read") {
  //         read.push(books[book])
  //       }
  //    }
  // }


  // componentDidMount() {
      // BooksAPI.getAll().then( (books) => {

      // }
      // }).catch( (error) => {
      //   window.alert("There is a problem with the connection to server. Fetch Failed. See the console for details.")
      //   console.error(error)
      // })
  // }

  render() {
    let { currentlyReading, wantToRead, read } = this.props
    //
    // this.arrangeBooksToShelves(currentlyReading, wantToRead, read)

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <Bookshelf
              name="currentlyReading"
              booksInTheShelf={ currentlyReading } > Currently Reading </Bookshelf>

              <Bookshelf
                name="wantToRead"
                booksInTheShelf={ wantToRead } > Want To Read </Bookshelf>

              <Bookshelf
                  name="read"
                  booksInTheShelf={ read } > Read </Bookshelf>
        </div>
        <div className="open-search">
          <Link to="/create">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MyBooksPage
