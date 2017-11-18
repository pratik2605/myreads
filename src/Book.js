import React from 'react'
import PropTypes from 'prop-types'

const Book = props => {
	const { book, onChangeBookShelf, currentShelf } = props
	return (
		<div className="book">
			<div className="book-top">
				<div
					className="book-cover"
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url("${book.imageLinks.thumbnail}")`
					}}
				/>
				<div className="book-shelf-changer">
					<select
						defaultValue={book.shelf}
						value={currentShelf}
						onChange={event =>
							onChangeBookShelf(book, event.target.value)
						}
					>
						<option value="none" disabled>
							Move to...
						</option>
						<option value="currentlyReading">
							Currently Reading
						</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{book.title}</div>
			<div className="book-authors">{book.subtitle}</div>
		</div>
	)
}

Book.propTypes = {
	book: PropTypes.object.isRequired,
	onChangeBookShelf: PropTypes.func.isRequired,
	currentShelf: PropTypes.string
}

export default Book
