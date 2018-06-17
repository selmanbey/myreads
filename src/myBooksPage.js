import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Book from './book'
import Bookshelf from './bookshelf'
import * as BooksAPI from './BooksAPI'


class MyBooksPage extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
      BooksAPI.getAll().then( (books) => {
        let currentlyReading = [];
        let wantToRead = [];
        let read = [];

        for (let book in books) {
          if (books[book].shelf === "currentlyReading") {
            currentlyReading.push(books[book])
          } else if (books[book].shelf === "wantToRead") {
            wantToRead.push(books[book])
          } else if (books[book].shelf === "read") {
            read.push(books[book])
          }

         this.setState({
           currentlyReading: currentlyReading,
           wantToRead: wantToRead,
           read: read
         })
        }
      }).catch( (error) => {
        window.alert("There is a problem with the connection to server. Fetch Failed. See the console for details.")
        console.error(error)
      })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <Bookshelf
              name="currentlyReading"
              booksInTheShelf={ this.state.currentlyReading } > Currently Reading </Bookshelf>

              <Bookshelf
                name="wantToRead"
                booksInTheShelf={ this.state.wantToRead } > Want To Read </Bookshelf>

              <Bookshelf
                  name="read"
                  booksInTheShelf={ this.state.read } > Read </Bookshelf>
        </div>
        <div className="open-search">
          <Link to="/create">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MyBooksPage
