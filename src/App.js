import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import SearchBooks from './searchBooks'
import MyBooksPage from './myBooksPage'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {

  state = {
    // books: []
    currentlyReading: [],
    wantToRead: [],
    read: []
  }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      // this.setState({ books })
      // console.log("App.js", "/ state: books: ", this.state.books)

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
      }

      this.setState({
        currentlyReading,
        wantToRead,
        read
      })

      console.log(this.state.currentlyReading)

      }).catch( (error) => {
        window.alert("There is a problem with the connection to server. Fetch Failed. See the console for details.")
        console.error(error)
    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={ () => (
          <MyBooksPage
          currentlyReading={ this.state.currentlyReading }
          wantToRead={ this.state.wantToRead }
          read={ this.state.read }/>
        )} />

        <Route path="/create" render={ () => (
          <SearchBooks />
        )} />

      </div>
    )
  }
}

export default BooksApp
