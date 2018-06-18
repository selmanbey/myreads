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
        console.log(this.state.query)
        console.log("if", data)
        this.setState({foundBooks: []})
      } else {
        console.log(this.state.query)
        console.log("else", this.state.query, data)
        this.setState({foundBooks: data})
      }
    })
  }

  render() {
    const {query, foundBooks} = this.state
    let template = [];

    for(let book in foundBooks) {

        // // Sanitize author
        // let author;
        // if(foundBooks[book].hasOwnProperty("error")) {
        //   // pass
        // } else if (!foundBooks[book].hasOwnProperty("authors")) {
        //   author = "Unknown"
        // }else {
        //     if (foundBooks[book]["authors"].length > 1) {
        //       author = foundBooks[book]["authors"][0] + " et al."
        //     } else {
        //       author = foundBooks[book]["authors"][0]
        //     }
        // }
        //
        // //Sanitize cover
        // let bgImage;
        // if(foundBooks[book].hasOwnProperty("error")) {
        //   // pass
        // } else if (!foundBooks[book].hasOwnProperty("imageLinks")) {
        //   // COULDN'T MAKE IT WORK WITH LOCAL PNG FILE (WHY?)
        //   bgImage = "url('http://www.scottishbooktrust.com/files/styles/book-cover-book-page/public/cover-not-available_215.png?itok=rM-kHv87')"
        // } else {
        //   bgImage = "url('" + foundBooks[book]["imageLinks"]["smallThumbnail"] + "')"
        // }

        template.push(
        <li key = { foundBooks[book].id }>
          <Book
            bookObject= { foundBooks[book] } />
        </li>)
    }


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
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
