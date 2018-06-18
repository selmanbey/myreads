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

  static propTypes = {
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired
  }

  onRefresh() {
    this.props.onRefresh()
  }


  render() {
    let { currentlyReading, wantToRead, read } = this.props

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
