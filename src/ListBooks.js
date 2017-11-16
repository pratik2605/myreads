import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book.js'

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		onChangeBookShelf: PropTypes.func.isRequired
	}

	state = {
		bookShelf: ''
	}

	render() {
		const { books, onChangeBookShelf } = this.props
		let currentlyReading = books.filter((book) => {return book.shelf === "currentlyReading"})
		let read = books.filter((book) => {return book.shelf === "read"})
		let wantToRead = books.filter((book) => {return book.shelf === "wantToRead"})

		return (
		<div className="list-books">
		  <div className="list-books-title">
			<h1>MyReads</h1>
		  </div>
		  <div className="list-books-content">
			<div>
			  <div className="bookshelf">
				<h2 className="bookshelf-title">Currently Reading</h2>
				<div className="bookshelf-books">
				  <ol className="books-grid">
				  {currentlyReading.map((book) => (
					  <li key={book.id}>
						<Book book={book} onChangeBookShelf={onChangeBookShelf}/>
					  </li>
				  ))}
				  </ol>
				</div>
			  </div>
			  <div className="bookshelf">
				<h2 className="bookshelf-title">Want to Read</h2>
				<div className="bookshelf-books">
				  <ol className="books-grid">
				  {wantToRead.map((book) => (
					  <li key={book.id}>
						<Book book={book} onChangeBookShelf={onChangeBookShelf}/>
					  </li>
				  ))}
				  </ol>
				</div>
			  </div>
			  <div className="bookshelf">
				<h2 className="bookshelf-title">Read</h2>
				<div className="bookshelf-books">
				  <ol className="books-grid">
				  {read.map((book) => (
					  <li key={book.id}>
						<Book book={book} onChangeBookShelf={onChangeBookShelf}/>
					  </li>
				  ))}
				  </ol>
				</div>
			  </div>
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
