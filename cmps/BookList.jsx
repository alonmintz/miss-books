import { BookPreview } from "./BookPreview.jsx";

const { useNavigate } = ReactRouterDOM;

export function BookList({ books, onRemoveBook }) {
  const navigate = useNavigate();
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id}>
          <section className="top-btns">
            <button onClick={() => navigate(`/book/edit/${book.id}`)}>
              Edit
            </button>
            <button onClick={() => onRemoveBook(book.id)}>delete</button>
          </section>
          <BookPreview book={book} />
          <button onClick={() => navigate(`/book/${book.id}`)}>Details</button>
        </li>
      ))}
    </ul>
  );
}
