import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
	books: [],
  }

  componentDidMount() {
	  this.getAllBooks()
  }

  getAllBooks = () => {
      BooksAPI.getAll().then((books) => {
        this.setState( { books } )
	  })
  }

  changeBookShelf = (book, bookShelf) => {
      if (bookShelf) {
          BooksAPI.update(book, bookShelf).then((response) => {
              this.getAllBooks()
          })
      }
  }

  render() {
	return (
	  <div className="app">
        <Route exact path="/" render={() => (
            <ListBooks books={this.state.books} onChangeBookShelf={this.changeBookShelf} />
        )}/>
        <Route exact path="/search" render={() => (
            <SearchBooks books={this.state.books} onChangeBookShelf={this.changeBookShelf} />
        )}/>
	  </div>
	)
  }
}

export default BooksApp
