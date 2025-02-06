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

  if (!books) return <div className="loader">Loading...</div>;
  return (
    <section className="book-index flex flex-column">
      <BookFilter />
      <Link to="/book/edit"> ADD </Link>
      <Outlet />
      <BookList books={books} />
      book index
    </section>
  );
}
