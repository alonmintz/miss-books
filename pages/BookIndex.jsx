import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;
const { Link, Outlet, useNavigate } = ReactRouterDOM;

export function BookIndex() {
  const [books, setBooks] = useState(null);
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());
  const navigate = useNavigate();

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

  function onSetFilterBy(editedFilterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...editedFilterBy }));
  }

  if (!books) return <h1 className="loader">Loading...</h1>;
  return (
    <section className="book-index flex flex-column">
      <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <button onClick={() => navigate("/book/edit")}>Add Book</button>
      {/* <Link to="/book/edit"> ADD </Link> */}
      <Outlet />
      {books.length === 0 ? (
        <h1>Sorry but none of the books match...</h1>
      ) : (
        <BookList books={books} onRemoveBook={removeBook} />
      )}
    </section>
  );
}
