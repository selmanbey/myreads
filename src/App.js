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
    currentlyReading: [],
    wantToRead: [],
    read: [],
    isLoading: true,
    message: "Book data is retrieved from server at the moment. Please wait. Should not be so long.",
    needsRefreshing: false
  }

  refreshPage() {
      if(this.state.needsRefreshing) {
        this.setState({needsRefreshing: false})
      } else {
        this.setState({needsRefreshing: true})
      }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {

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
        read,
        isLoading: false
      })

      }).catch( (error) => {
        this.setState({
          message: "There occured a problem while retrieving data. Fetch Failed. Try refreshing the page. If problem persist, please inspect the error in the console."
        })
        console.error(error)

    })
  }

  // componentDidUpdate() {
  //   this.componentDidMount()
  // }

  render() {
    console.log("App.js rendered")

    return (
      <div className="app">

        <Route exact path="/" render={ () => ( this.state.isLoading ?
          <h1> { this.state.message }</h1> :
          <MyBooksPage
          currentlyReading={ this.state.currentlyReading }
          wantToRead={ this.state.wantToRead }
          read={ this.state.read }
          onRefresh={ this.refreshPage } />
        )} />

        <Route path="/create" render={ () => (
          <SearchBooks />
        )} />

      </div>
    )
  }
}

export default BooksApp
