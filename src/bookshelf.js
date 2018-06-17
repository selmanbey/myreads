import React, { Component } from 'react'
import Book from './book'
import PropTypes from 'prop-types'

class Bookshelf extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    booksInTheShelf: PropTypes.array,
  }

  render() {

    const { name, booksInTheShelf } = this.props
    let template = [];

    for(let book in booksInTheShelf) {

        // Checks if there is proper data in booksInTheShelf (to prevent crashes)
        // Checks if there is more than one author for the book
        let author;
        if(!booksInTheShelf[book]["authors"] || booksInTheShelf[book].hasOwnProperty("error")) {
          // pass
        } else {
            if (booksInTheShelf[book]["authors"].length > 1) {
              author = booksInTheShelf[book]["authors"][0] + " et al."
            } else {
              author = booksInTheShelf[book]["authors"][0]
            }
        }

        let bgImage = "url('\" + booksInTheShelf[book][\"imageLinks\"][\"smallThumbnail\"] + \"')"

        template.push(
        <li>
          <Book
            backgroundImage={ bgImage }
            bookTitle={ booksInTheShelf[book].title }
            bookAuthors={ author } />
        </li>)
    }

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Bookshelf Trial</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {
                template
              }
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelf
