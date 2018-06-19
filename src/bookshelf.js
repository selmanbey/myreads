import React, { Component } from 'react'
import Book from './book'
import PropTypes from 'prop-types'

class Bookshelf extends Component {
  constructor(props) {
   super(props)

   this.onRefresh = this.onRefresh.bind(this)
 }

  static propTypes = {
    name: PropTypes.string.isRequired,
    booksInTheShelf: PropTypes.array,
  }

  onRefresh = (data) => {
    this.props.onRefresh(data)
  }

  render() {
    const { name, booksInTheShelf } = this.props

    let componentTitle;

    switch(name) {
      case "currentlyReading":
        componentTitle = "Currently Reading"
        break
      case "wantToRead":
        componentTitle = "Want To Read"
        break
      case "read":
        componentTitle = "Read"
        break
    }

    let template = [];

    for(let book in booksInTheShelf) {

        template.push(
        <li key={ booksInTheShelf[book].id } >
          <Book
            bookObject = { booksInTheShelf[book] }
            onRefresh={ this.props.onRefresh }
            />
        </li>)
    }

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title"> { componentTitle }</h2>
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
