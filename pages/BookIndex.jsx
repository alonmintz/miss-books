import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/BookList.jsx";
import { bookService } from "../services/book.service.js";
import { showErrorMsg } from "../services/event-bus.service.js";
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
      .catch((err) => {
        console.log("Error loading books: ", err);
        showErrorMsg("Error loading books");
      });
  }

  function removeBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      })
      .catch((err) => {
        console.log(`Error removing book ${bookId}: `, err);
        showErrorMsg(`Error removing book ${bookId}`);
      });
  }

  function onSetFilterBy(editedFilterBy) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...editedFilterBy }));
  }

  if (!books) return <h1 className="loader">Loading...</h1>;
  return (
    <section className="book-index flex flex-column">
      <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <section className="flex justify-center">
        <Link to="/book/edit" className="link-btn add-btn">
          Add Original Book
        </Link>
        <Link to="/book/add" className="link-btn add-btn">
          Add Google Book
        </Link>
      </section>
      <Outlet />
      {books.length === 0 ? (
        <h1>Sorry, no books to show...</h1>
      ) : (
        <BookList books={books} onRemoveBook={removeBook} />
      )}
    </section>
  );
}
