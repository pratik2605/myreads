import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book.js'

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		onChangeBookShelf: PropTypes.func.isRequired
	}

	render() {
		const shelfs = [
			{ name: 'currentlyReading', title: 'Currently Reading' },
			{ name: 'wantToRead', title: 'Want to Read' },
			{ name: 'read', title: 'Read' }
		]

		const { books, onChangeBookShelf } = this.props
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
			  	<div className="list-books-content">
					<div>
						{
							shelfs.map((shelf) => (
								<div className="bookshelf" key={shelf.name}>
									<h2 className="bookshelf-title">{shelf.title}</h2>
									<div className="bookshelf-books">
										<ol className="books-grid">
											{
												books.filter(
													(book) => {
														return book.shelf === shelf.name
													}
												).map((book) => (
													<li key={book.id}>
														<Book
															book={book}
															onChangeBookShelf={onChangeBookShelf}
														/>
													</li>
												))
											}
										</ol>
									</div>
								</div>
							))
						}
					</div>
				</div>
			  <div className="open-search">
			  		<Link to="/search">Add a book</Link>
			  </div>
			</div>
		)
	}
}

export default ListBooks
