import { bookService } from "../services/book.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
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
        showErrorMsg("Error fetching books via google");
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
    bookService
      .saveGoogleBook(book)
      .then(showSuccessMsg(`book ${book.id} successfully added`))
      .catch((err) => {
        console.log(err);
        showErrorMsg("Error adding book");
      })
      .finally(navigate("/book"));
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
