import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './book'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends Component {
  state = {
    query: "",
    foundBooks: [],
  }

  handleChange = (value) => {
    this.setState({
      query: value,
    }, () => {
      this.renderBooks()
    });
  }

  renderBooks = () => {
    BooksAPI.search(this.state.query).then((data) => {

      if(!data || data.hasOwnProperty("error")) {
        this.setState({foundBooks: []})
      } else {
        BooksAPI.getAll().then((myBooks) => {
            let newBooks = this.checkShelves(myBooks, data)
            this.setState({foundBooks: newBooks})
        })
      }
    })
  }

  onRefresh = (data, id, shelf) => {
    BooksAPI.update(data, shelf).then(
      this.props.onRefresh()
    )

    BooksAPI.getAll().then((myBooks) => {
      this.checkShelves(myBooks, this.state.foundBooks)
    })
  }

  changeShelf = (id, shelf) => {
    let newBooks = this.state.foundBooks.map( (book) => {
      if(book.id === id) {
        book.shelf = shelf
        return book
      } else {
        return book
      }
    })

    this.setState({foundBooks: newBooks})
  }

  checkShelves = (myBooks, searchBooks) => {
    let hasAnythingChanged: false

    let newBooks = searchBooks.map( (book) => {
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
      this.setState({ foundBooks: newBooks })
    }

    return newBooks
  }

  render() {
    const {query, foundBooks} = this.state
    let template = [];

    for(let book in foundBooks) {

        let bookObject = foundBooks[book]

        foundBooks[book].hasOwnProperty("shelf") ?
        bookObject["shelf"] = foundBooks[book].shelf :
        bookObject["shelf"] = "none"

        template.push(
        <li key = { foundBooks[book].id }>
          <Book
            bookObject= { bookObject }
            onRefresh= { this.onRefresh }/>
        </li>)
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" onClick= { this.props.onRefresh }> Close </Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={ (e) => {this.handleChange(e.target.value)} }/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.query ? template :
              <div className="empty-search-message">
                This app uses the API and the database provided by Udacity to search and retrieve books.
                Thus, the search is limited to a particular set of search terms.
                You can find these search terms here: &nbsp;
                <a href="https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md"> Search Terms </a>
              </div>
             }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
