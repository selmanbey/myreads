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
    isLoading: true,
    message: "Book data is retrieved from server at the moment. Please wait. Should not be so long.",
    needsRefreshing: false
  }

  refreshPage() {
      // ternary operator serving as a refresh toggle
      this.state.needsRefreshing ?
      this.setState({needsRefreshing: false}) :
      this.setState({needsRefreshing: true})

      this.fetchBooks()
  }


  fetchBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        allMyBooks: books,
        isLoading: false,
      })
      }).catch( (error) => {
        this.setState({
          message: "There occured a problem while retrieving data. Fetch Failed. Try refreshing the page. If problem persist, please inspect the error in the console."
        })
        console.error(error)
    })
  }

  componentDidMount() {
    this.fetchBooks()
  }

  render() {

    return (
      <div id={ this.state.needsRefreshing.toString() } className="app">

        <Route exact path="/" render={ () => ( this.state.isLoading ?
          <h1> { this.state.message } </h1> :
          <MyBooksPage
            books={ this.state.allMyBooks }
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
