import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'
import PropTypes from 'prop-types'
import * as BooksAPI from './utils/BooksAPI'
import { DebounceInput } from 'react-debounce-input'

class SearchBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		onChangeBookShelf: PropTypes.func.isRequired
	}

	state = {
		query: '',
		filteredBooks: []
	}

	/**
	 * Get the current shelf of the book if available else return `none`
	 *
	 * @var object currentBooks
	 * @var object book
	 * @return string
	 */
	getCurrentShelf = (currentBooks, book) => {
		let bookFound = currentBooks.filter(currentBook => {
			return book.id === currentBook.id
		})
		if (bookFound.length > 0) {
			return bookFound[0].shelf ? bookFound[0].shelf : 'none'
		}
		return 'none'
	}

	/**
	 * Search books based on the query
	 *
	 * @var string query
	 * @return object
	 */
	filterBooks = query => {
		if (query) {
			this.setState({ query: query.trim() })
			BooksAPI.search(query, 10).then(books => {
				this.setState({ filteredBooks: books })
			})
		}
	}

	render() {
		const { query, books, onChangeBookShelf } = this.props
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">
						Close
					</Link>
					<div className="search-books-input-wrapper">
						<DebounceInput
							minLength={3}
							debounceTimeout={300}
							onChange={event =>
								this.filterBooks(event.target.value)
							}
							value={query}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.filteredBooks.length > 0 &&
							this.state.filteredBooks.map(book => (
								<li key={book.id}>
									<Book
										book={book}
										currentShelf={this.getCurrentShelf(
											books,
											book
										)}
										onChangeBookShelf={onChangeBookShelf}
									/>
								</li>
							))}
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchBooks
