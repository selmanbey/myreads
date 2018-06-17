import React, { Component } from 'react'
import PropTypes from 'prop-types';

// import { Link } from 'react-router-dom'

class Book extends Component {
  static propTypes = {
    bookTitle: PropTypes.string.isRequired,
    bookAuthors: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string,
  }

  state = {
    currentStatus: "currentlyReading"
  }

  handleSelect = (status) => {
    this.setState({currentStatus: status});
    console.log(this.state.currentStatus)
  }

  render() {
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.props.backgroundImage }}></div>
            <div className="book-shelf-changer">
              <select onChange={ (e) => {this.handleSelect(e.target.value)} }>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{ this.props.bookTitle }</div>
          <div className="book-authors">{ this.props.bookAuthors}</div>
        </div>
    )
  }
}

export default Book
