import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";
import { utilService } from "../services/util.service.js";

const { useState, useEffect } = React;
const { Link, Outlet, useSearchParams } = ReactRouterDOM;

export function BookIndex() {
  const [books, setBooks] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterBy, setFilterBy] = useState(
    bookService.getFilterFromSearchParams(searchParams)
  );

  useEffect(() => {
    setSearchParams(utilService.getTruthyValues(filterBy));
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
      <Link to="/book/edit" className="link-btn add-btn">
        Add Original Book
      </Link>
      <Link to="/book/add" className="link-btn add-btn">
        Add Google Book
      </Link>
      <Outlet />
      {books.length === 0 ? (
        <h1>Sorry but none of the books match...</h1>
      ) : (
        <BookList books={books} onRemoveBook={removeBook} />
      )}
    </section>
  );
}
