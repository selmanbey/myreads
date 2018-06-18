import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './book'
import Bookshelf from './bookshelf'
import * as BooksAPI from './BooksAPI'


class MyBooksPage extends Component {
  constructor(props) {
   super(props)

   this.onRefresh = this.onRefresh.bind(this)
 }

  state = {
    currentlyReading: this.props.books.filter(book => book.shelf === "currentlyReading"),
    wantToRead: this.props.books.filter(book => book.shelf === "wantToRead"),
    read: this.props.books.filter(book => book.shelf === "read")
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  // refreshes the page and the sub-components when a Book is moved into a
  // different shelf (the trigger is in Book component, <select> event)
  onRefresh = (data, id, shelf) => {
    this.updateBooks(data, id, shelf)
  }

  // takes the shelf info from Book component when the shelf changes
  // pipes it to updateBooks
  changeShelf = (id, shelf) => {

    let newBooks = this.props.books.map( (book) => {
      if(book.id === id) {
        book.shelf = shelf
        return book
      } else {
        return book
      }
    })

    return newBooks
  }

  //updates the book shelves and sets the state accordingly
  updateBooks = (updateData, id, shelf) => {
    let newBooks = this.changeShelf(id, shelf)
    console.log("newBooks in updateBooks:", newBooks)

    let currentlyReading = newBooks.filter( (book) => {
      return updateData["currentlyReading"].includes(book.id)
    });

    let wantToRead = newBooks.filter( (book) => {
      return updateData["wantToRead"].includes(book.id)
    });

    let read = newBooks.filter( (book) => {
      return updateData["read"].includes(book.id)
    });

    this.setState({
      currentlyReading,
      wantToRead,
      read
    })

  }


  render() {

    let { currentlyReading, wantToRead, read } = this.state

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">

            <Bookshelf
              name="currentlyReading"
              booksInTheShelf={ currentlyReading }
              onRefresh={ this.onRefresh } />

              <Bookshelf
                name="wantToRead"
                booksInTheShelf={ wantToRead }
                onRefresh={ this.onRefresh } />

              <Bookshelf
                  name="read"
                  booksInTheShelf={ read }
                  onRefresh={ this.onRefresh } />
        </div>
        <div className="open-search">
          <Link to="/create">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MyBooksPage
