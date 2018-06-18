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
    // currentlyReading: PropTypes.array.isRequired,
    // wantToRead: PropTypes.array.isRequired,
    // read: PropTypes.array.isRequired
  }

  onRefresh = (data) => {
    // this.props.onRefresh()
    this.updateBooks(data)
  }



  updateBooks = (updateData) => {
    let currentlyReading = this.props.books.filter( (book) => {
      return updateData["currentlyReading"].includes(book.id)
    });

    console.log("CURRENTLY READING:", currentlyReading)

    let wantToRead = this.props.books.filter( (book) => {
      return updateData["wantToRead"].includes(book.id)
    });

    let read = this.props.books.filter( (book) => {
      return updateData["read"].includes(book.id)
    });

    this.setState({
      currentlyReading,
      wantToRead,
      read
    })

  }


  render() {
    // let { currentlyReading, wantToRead, read } = this.props
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
              onRefresh={ this.onRefresh }> Currently Reading </Bookshelf>

              <Bookshelf
                name="wantToRead"
                booksInTheShelf={ wantToRead }
                onRefresh={ this.onRefresh } > Want To Read </Bookshelf>

              <Bookshelf
                  name="read"
                  booksInTheShelf={ read }
                  onRefresh={ this.onRefresh } > Read </Bookshelf>
        </div>
        <div className="open-search">
          <Link to="/create">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MyBooksPage
