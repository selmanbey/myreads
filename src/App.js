import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import SearchBooks from './searchBooks'
import MyBooksPage from './myBooksPage'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  constructor(props) {
   super(props)

   this.refreshPage = this.refreshPage.bind(this)
 }

  state = {
    allMyBooks: [],
    // currentlyReading: [],
    // wantToRead: [],
    // read: [],
    isLoading: true,
    message: "Book data is retrieved from server at the moment. Please wait. Should not be so long.",
    needsRefreshing: false
  }

  refreshPage() {

      this.state.needsRefreshing ?
      this.setState({needsRefreshing: false}) :
      this.setState({needsRefreshing: true})
      console.log("needsRefreshing stateSet: ", this.state.needsRefreshing)
      this.fetchBooks()
      // if(this.state.needsRefreshing) {
      //   this.setState({needsRefreshing: false})
      // } else {
      //   this.setState({needsRefreshing: true})
      // }
  }

  // changeBookFolder = (book, shelf) => {
  //   if (shelf === "currentlyReading") {
  //
  //   } else if (shelf === "wantToRead") {
  //   } else if (shelf === "read")
  // }

  fetchBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        allMyBooks: books,
        isLoading: false,
      })

      console.log("Books are retrieved")
      }).catch( (error) => {
        this.setState({
          message: "There occured a problem while retrieving data. Fetch Failed. Try refreshing the page. If problem persist, please inspect the error in the console."
        })
        console.error(error)
    })
  }

  componentDidMount() {
    console.log("componentDidMount")
    BooksAPI.getAll().then((books) => {

      // let currentlyReading = [];
      // let wantToRead = [];
      // let read = [];
      //
      // for (let book in books) {
      //     if (books[book].shelf === "currentlyReading") {
      //       currentlyReading.push(books[book])
      //     } else if (books[book].shelf === "wantToRead") {
      //       wantToRead.push(books[book])
      //     } else if (books[book].shelf === "read") {
      //       read.push(books[book])
      //     }
      // }

      this.setState({
        allMyBooks: books,
        // currentlyReading,
        // wantToRead,
        // read,
        isLoading: false,
      })

      console.log("Books are retrieved")
      }).catch( (error) => {
        this.setState({
          message: "There occured a problem while retrieving data. Fetch Failed. Try refreshing the page. If problem persist, please inspect the error in the console."
        })
        console.error(error)

    })
  }
  //
  // componentWillUpdate() {
  //   this.componentDidMount()
  // }

  render() {
    console.log("App.js rendered")

    return (
      <div id={ this.state.needsRefreshing.toString() } className="app">

        <Route exact path="/" render={ () => ( this.state.isLoading ?
          <h1> { this.state.message } </h1> :
          <MyBooksPage
            books={ this.state.allMyBooks }
            // currentlyReading={ this.state.currentlyReading }
            // wantToRead={ this.state.wantToRead }
            // read={ this.state.read }
            onRefresh={ this.refreshPage } />
        )} />

        <Route path="/create" render={ () => (
          <SearchBooks
            onRefresh={ this.refreshPage }
          />
        )} />

      </div>
    )
  }
}

export default BooksApp
