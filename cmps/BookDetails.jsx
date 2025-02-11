import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;

export function BookDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    console.log(params);
    loadBook();
  }, [params.bookId]);

  function loadBook() {
    setBook(null);
    bookService
      .get(params.bookId)
      .then(setBook)
      .catch((err) => {
        console.log(`Error loading book id: ${params.bookId}`, err);
      });
  }

  function onClose() {
    navigate("/book");
  }

  function evStop(ev) {
    ev.stopPropagation();
  }

  const getAuthors = () => {
    if (!book) return;
    return book.authors.join(", ");
  };

  const getCategories = () => {
    if (!book) return;
    return book.categories.join(", ");
  };

  if (!book)
    return (
      <section className="modal-backdrop" onClick={onClose}>
        <section className="book-details modal-content" onClick={evStop}>
          <h1 className="loader">Loading...</h1>
        </section>
      </section>
    );
  return (
    <section className="modal-backdrop" onClick={onClose}>
      <section className="book-details modal-content" onClick={evStop}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h1>{`${book.title} - ${getAuthors()}`}</h1>
        <h4>{book.subtitle}</h4>
        <section className="details">
          <img src={book.thumbnail} alt="" />
          <h4 className="grid-detail price">
            Price: {book.listPrice.amount} {book.listPrice.currencyCode}
          </h4>
          <h4 className="grid-detail lng">Language: {book.language}</h4>
          <h4 className="grid-detail ctgs">Categories: {getCategories()}</h4>
          <h4 className="grid-detail year">
            Publish Year: {book.publishedDate}
          </h4>
          <h4 className="grid-detail page-count">
            Page Count: {book.pageCount}
          </h4>
        </section>
        <p className="book-desc">{book.description}</p>
        <button
          className="prev-btn"
          onClick={() => navigate(`/book/${book.prevBookId}`)}
        >
          <i className="fa fa-arrow-left"></i>
        </button>
        <button
          className="next-btn"
          onClick={() => navigate(`/book/${book.nextBookId}`)}
        >
          <i className="fa fa-arrow-right"></i>
        </button>
      </section>
    </section>
  );
}
