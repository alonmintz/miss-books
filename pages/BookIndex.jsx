import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;
const { Link, Outlet } = ReactRouterDOM;

export function BookIndex() {
  const [books, setBooks] = useState(null);
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  function loadBooks() {
    bookService
      .query(filterBy)
      .then(setBooks)
      .catch((err) => console.log("Error loading books: ", err));
  }

  function removeBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      })
      .catch((err) => {
        console.log(`Error removing ${bookId}: `, err);
      });
  }

  if (!books) return <h1 className="loader">Loading...</h1>;
  return (
    <section className="book-index flex flex-column">
      <BookFilter />
      <Link to="/book/edit"> ADD </Link>
      <Outlet />
      <BookList books={books} onRemoveBook={removeBook} />
      book index
    </section>
  );
}
