import { BookPreview } from "./BookPreview.jsx";

const { useNavigate, Link } = ReactRouterDOM;

export function BookList({ books, onRemoveBook }) {
  const navigate = useNavigate();
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id}>
          <button className="remove-btn" onClick={() => onRemoveBook(book.id)}>
            <i className="fa fa-trash"></i>
          </button>
          <BookPreview book={book} />
          <section className="flex">
            <Link to={`/book/${book.id}`} className="link-btn details-btn">
              Details
            </Link>
            <Link to={`/book/edit/${book.id}`} className="link-btn edit-btn">
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
          </section>
        </li>
      ))}
    </ul>
  );
}
