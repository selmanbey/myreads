import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI';

class Book extends Component {
  static propTypes = {
    bookObject: PropTypes.object.isRequired,
  }

  state = {
    currentStatus: this.props.bookObject.shelf
  }

  // 1. updates the shelf info in the database
  // 2. sends id and shelf to update the info in the MyBooksPage state
  handleSelect = (status) => {
    BooksAPI.update(this.props.bookObject, status).then(
      (data) => {
        let id = this.props.bookObject.id
        let shelf = status
        this.props.onRefresh(data, id, shelf)
      }
    )
  }

  render() {
    let { bookObject } = this.props
    // Checks if there is proper data in booksInTheShelf (to prevent crashes)
    // Checks if there is more than one author for the book
    let author;
    if(!bookObject["authors"] || bookObject.hasOwnProperty("error")) {
      // pass
    } else {
        if (bookObject["authors"].length > 1) {
          author = bookObject["authors"][0] + " et al."
        } else {
          author = bookObject["authors"][0]
        }
    }

    let bgImage = "url('" + bookObject["imageLinks"]["smallThumbnail"] + "')"

    console.log("books.js is now rendering. book is: ", bookObject.title, ", shelf is: ", bookObject.shelf)
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: bgImage }}></div>
            <div className="book-shelf-changer">
              <select value={ this.props.bookObject.shelf } onChange={ (e) => {
                this.handleSelect(e.target.value);
              } }>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{ bookObject.title }</div>
          <div className="book-authors">{ author }</div>
        </div>
    )
  }
}

export default Book
