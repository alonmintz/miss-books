import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;
const { useNavigate, useParams, Link } = ReactRouterDOM;

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
        <h1>{book.title}</h1>
        {book.authors.map((author) => (
          <h4 key="author">{author}</h4>
        ))}
        <img src={book.thumbnail} alt="" />
        <h4>{book.subtitle}</h4>
        <section
          className="flex"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <button>
            <Link to={`/book/${book.prevBookId}`}>
              <i className="fa fa-arrow-left"></i>
            </Link>
          </button>
          <button>
            <Link to={`/book/${book.nextBookId}`}>
              <i className="fa fa-arrow-right"></i>
            </Link>
          </button>
        </section>
      </section>
    </section>
  );
}

//TODO: why sometimes the first button click doesn't work??
//TODO: keep the modal size one, avoid the content from glitching away
