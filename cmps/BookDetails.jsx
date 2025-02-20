import { bookService } from "../services/book.service.js";
import { AddReview } from "./AddReview.jsx";
import { LongTxt } from "./LongTxt.jsx";
import { ReviewList } from "./ReviewList.jsx";

const { useState, useEffect } = React;
const { useNavigate, useParams, Link } = ReactRouterDOM;

export function BookDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const [book, setBook] = useState(null);
  const [isReviewModal, setIsReviewModal] = useState(false);

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

  function toggleIsReviewModalOpen() {
    setIsReviewModal((prev) => !prev);
  }

  if (!book)
    return (
      <section className="modal-backdrop" onClick={onClose}>
        <section className="book-details modal-content" onClick={evStop}>
          <h1 className="loader">Loading...</h1>
        </section>
      </section>
    );

  const getAuthors = () => {
    return book.authors.join(", ");
  };

  const getCategories = () => {
    return book.categories.join(", ");
  };

  const getReadingLevel = () => {
    if (book.pageCount > 500) {
      return "Serious Reading";
    } else if (book.pageCount > 100) {
      return "Descent Reading";
    } else if (book.pageCount < 100) {
      return "Light Reading";
    }
  };

  const getIsVintage = () => {
    const currentYear = new Date().getFullYear();
    return currentYear - book.publishedDate > 10 ? "Vintage" : "New";
  };

  const getPriceClass = () => {
    if (book.listPrice.amount > 150) {
      return "expensive";
    } else if (book.listPrice.amount < 20) {
      return "cheap";
    }
    return "";
  };

  function onSetReviews(review) {
    bookService
      .addReview(params.bookId, review)
      .then(setBook)
      .catch((err) => {
        console.log(`Error adding review`, err);
      });
  }

  function onRemoveReview(reviewId) {
    bookService
      .removeReview(book, reviewId)
      .then(setBook)
      .catch((err) => {
        console.log(`Error removing review`, err);
      });
  }

  return (
    <section className="modal-backdrop" onClick={onClose}>
      <section className="book-details modal-content" onClick={evStop}>
        <Link to="/book" className="link-btn close-btn">
          X
        </Link>
        <h1>{`${book.title} - ${getAuthors()}`}</h1>
        <h4>{book.subtitle}</h4>
        <section className="details">
          <img className="book-img" src={book.thumbnail} alt="" />
          <section className="grid-detail price">
            {book.listPrice.isOnSale && (
              <img className="sale-img" src="assets/img/on-sale.png" />
            )}
            <h4>
              Price:{" "}
              <span className={getPriceClass()}>
                {book.listPrice.amount} {book.listPrice.currencyCode}
              </span>
            </h4>
          </section>
          <h4 className="grid-detail lng">Language: {book.language}</h4>
          <h4 className="grid-detail ctgs">Categories: {getCategories()}</h4>
          <h4 className="grid-detail year">
            Publish Year: {book.publishedDate}{" "}
            <span className="additional">{`(${getIsVintage()})`}</span>
          </h4>
          <h4 className="grid-detail page-count">
            Page Count: {book.pageCount}{" "}
            <span className="additional">{`(${getReadingLevel()})`}</span>
          </h4>
          {book.description && (
            <LongTxt txt={book.description} className="grid-detail book-desc" />
          )}

          <section className="grid-detail reviews-section">
            <button onClick={toggleIsReviewModalOpen}>Add Review</button>
            {isReviewModal && (
              <AddReview
                onAddReview={onSetReviews}
                toggleReview={toggleIsReviewModalOpen}
              />
            )}
            <ReviewList
              reviews={book.reviews}
              onRemoveReview={onRemoveReview}
            />
          </section>
        </section>

        <Link to={`/book/${book.prevBookId}`} className="link-btn prev-btn">
          <i className="fa fa-arrow-left"></i>
        </Link>
        <Link to={`/book/${book.nextBookId}`} className="link-btn next-btn">
          <i className="fa fa-arrow-right"></i>
        </Link>
      </section>
    </section>
  );
}
