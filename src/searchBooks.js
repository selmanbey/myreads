import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './book'
import * as BooksAPI from './BooksAPI'
// import escapeStringRegexp from 'escape-string-regexp'


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
          console.log("myBooks inside GetAll:", myBooks)
          console.log("data inside GetAll:", data)

            let newBooks = this.checkShelves(myBooks, data)
            console.log("newBooks inside GetAll:", newBooks)
            this.setState({foundBooks: newBooks}, () => {
              (console.log("get all set the state", this.state.foundBooks))
            })
        })
      }

      // if(!data || data.hasOwnProperty("error")) {
      //   this.setState({foundBooks: []})
      // } else {
      //   this.setState({foundBooks: data})
      // }
      console.log("renderBooks triggered", this.state.foundBooks)
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
    console.log("changeShelf triggered", this.state.foundBooks)
  }

  checkShelves = (myBooks, searchBooks) => {
    let hasAnythingChanged: false

    let newBooks = searchBooks.map( (book) => {
      let idArray = myBooks.map( (mybook) => (mybook.id))

      if (idArray.includes(book.id)) {
          let newBook = myBooks.filter((mybook) => (mybook.id === book.id))[0];
          console.log("IF book: ", newBook)
          hasAnythingChanged = true;
          return newBook
      } else {
        return book
      }
    })
    console.log("newBooks: ", newBooks)

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

    console.log("searchBooks.js rendered")
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" onClick= { this.props.onRefresh }> Close </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={ (e) => {this.handleChange(e.target.value)} }/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { template }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
