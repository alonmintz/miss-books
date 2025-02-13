import { BookPreview } from "./BookPreview.jsx";

const { useNavigate, Link } = ReactRouterDOM;

export function BookList({ books, onRemoveBook }) {
  const navigate = useNavigate();
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id}>
          <section className="top-btns">
            <Link to={`/book/edit/${book.id}`} className="link-btn edit-btn">
              Edit
            </Link>
            <button onClick={() => onRemoveBook(book.id)}>delete</button>
          </section>
          <BookPreview book={book} />
          <Link to={`/book/${book.id}`} className="link-btn details-btn">
            Details
          </Link>
        </li>
      ))}
    </ul>
  );
}
