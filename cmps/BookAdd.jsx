import { bookService } from "../services/book.service.js";
import { utilService } from "../services/util.service.js";

const { useState, useEffect, useRef } = React;
const { useNavigate } = ReactRouterDOM;

export function BookAdd() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);

  function fetchGoogleBooks(name) {
    bookService
      .getGoogleBooks(name)
      .then(setBooks)
      .catch((err) => {
        console.log("Error fetching books via google: ", err);
      });
  }

  const fetchGoogleBooksDebounce = useRef(
    utilService.debounce(fetchGoogleBooks, 1000)
  ).current;
  const navigate = useNavigate();

  useEffect(() => {
    fetchGoogleBooksDebounce(bookName);
  }, [bookName]);

  function onClose() {
    navigate("/book");
  }

  function evStop(ev) {
    ev.stopPropagation();
  }

  function onChangeInput({ target }) {
    const { value } = target;
    setBookName(value);
  }

  function onAddBook(book) {
    console.log("book to add: ", book);
    bookService
      .saveGoogleBook(book)
      .then(navigate("/book"))
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="modal-backdrop" onClick={onClose}>
      <section className="book-add modal-content" onClick={evStop}>
        <h1>Add Book From Google</h1>
        <input type="search" name="book-name" onChange={onChangeInput} />
        {books && (
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                {book.title} <button onClick={() => onAddBook(book)}>➕</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
