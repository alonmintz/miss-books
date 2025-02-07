import { BookPreview } from "./BookPreview.jsx";

const { Link } = ReactRouterDOM;

export function BookList({ books, onRemoveBook }) {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id}>
          <section className="top-btns">
            <button>
              <Link to={`/book/edit/${book.id}`}>Edit</Link>
            </button>
            <button onClick={() => onRemoveBook(book.id)}>delete</button>
          </section>
          <BookPreview book={book} />
          <button>
            <Link to={`/book/${book.id}`}>Details</Link>
          </button>
        </li>
      ))}
    </ul>
  );
}
