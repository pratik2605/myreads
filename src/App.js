import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends Component {
	state = {
		books: []
	}

	componentDidMount() {
		this.getAllBooks()
	}

	/**
	 * Fetches all the books from the API
	 *
	 * @return object
	 */
	getAllBooks = () => {
		BooksAPI.getAll().then(books => {
			this.setState({ books })
		})
	}

	/**
	 * Update shelf of the book
	 *
	 * @var object book
	 * @var string bookShelf
	 */
	changeBookShelf = (book, bookShelf) => {
		if (bookShelf && book.shelf !== bookShelf) {
			BooksAPI.update(book, bookShelf).then(() => {
				book.shelf = bookShelf
				this.setState(state => ({
					books: state.books
						.filter(b => b.id !== book.id)
						.concat([book])
				}))
			})
		}
	}

	/**
	 * Renders the ListBooks & SearchBooks components
	 */
	render() {
		return (
			<div className="app">
				<Route
					exact
					path="/"
					render={() => (
						<ListBooks
							books={this.state.books}
							onChangeBookShelf={this.changeBookShelf}
						/>
					)}
				/>
				<Route
					exact
					path="/search"
					render={() => (
						<SearchBooks
							books={this.state.books}
							onChangeBookShelf={this.changeBookShelf}
						/>
					)}
				/>
			</div>
		)
	}
}

export default BooksApp
