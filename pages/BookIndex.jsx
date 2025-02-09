import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;
const { Link, Outlet, useLocation } = ReactRouterDOM;

export function BookIndex() {
  const [books, setBooks] = useState(null);
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());

  //   const location = useLocation();

  useEffect(() => {
    loadBooks();
  }, [filterBy]);

  //   useEffect(() => {
  //     loadBooks();
  //   }, [location]);

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

  function onSetFilterBy(editedFilterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...editedFilterBy }));
  }

  if (!books) return <h1 className="loader">Loading...</h1>;
  return (
    <section className="book-index flex flex-column">
      <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <Link to="/book/edit"> ADD </Link>
      <Outlet />
      {books.length === 0 ? (
        <h1>Sorry but none of the books match...</h1>
      ) : (
        <BookList books={books} onRemoveBook={removeBook} />
      )}
    </section>
  );
}
