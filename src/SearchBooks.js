import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'

class SearchBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeBookShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        filteredBooks: []
    }

    getCurrentShelf = (currentBooks, book) => {
        let bookFound = currentBooks.filter((currentBook) => { return book.id === currentBook.id })
        if (bookFound.length > 0) {
            return (bookFound[0].shelf) ? bookFound[0].shelf : 'none'
        }
        return 'none';
    }

    filterBooks = (query) => {
        if (query) {
            this.setState({ query: query.trim() })
            BooksAPI.search(query, 10).then((books) => {
                this.setState({ filteredBooks: books })
            })
        }
    }

    render() {
        const { query, books, onChangeBookShelf } = this.props
        return (
            <div className="search-books">
  			<div className="search-books-bar">
  			  <Link className="close-search" to="/">Close</Link>
  			  <div className="search-books-input-wrapper">
  				<input
                    type="text"
                    placeholder="Search by title or author"
                    onChange={(event) => this.filterBooks(event.target.value)}
                    value={query}
                />
  			  </div>
  			</div>
  			<div className="search-books-results">
  			  <ol className="books-grid">
                  {this.state.filteredBooks.length > 0 && this.state.filteredBooks.map((book) => (
                      <li key={book.id}>
                        <Book book={book} currentShelf={this.getCurrentShelf(books, book)} onChangeBookShelf={onChangeBookShelf}/>
                      </li>
                  ))}
              </ol>
  			</div>
  		  </div>
        )
    }
}

export default SearchBooks
