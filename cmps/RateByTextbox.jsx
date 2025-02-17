import { bookService } from "../services/book.service.js";
const { useState } = React;

export function RateByTextbox({ onAddReview, onClose }) {
  const [review, setReview] = useState(bookService.getEmptyReview("text"));

  function handleChange({ target }) {
    const { type, name: field } = target;
    let { value } = target;

    switch (type) {
      case "range":
      case "number":
        value = +value;
        break;

      case "checkbox":
        value = target.checked;
        break;
    }

    setReview((prevReview) => ({ ...prevReview, [field]: value }));
  }

  function onSubmitReview(ev) {
    ev.preventDefault();
    onAddReview(review);
    onClose();
  }

  return (
    <section className="rate-by-textbox">
      <form onSubmit={onSubmitReview}>
        <label htmlFor="rate-fullname">Full Name: </label>
        <input
          type="text"
          name="fullname"
          id="rate-fullname"
          value={review.fullname || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="rate-fullname">Read At: </label>
        <input
          type="date"
          name="readAt"
          id="rate-read-at"
          onChange={handleChange}
          required
        />
        <textarea
          name="rating"
          id="rate-text"
          placeholder="Share your thoughts about the book..."
          onChange={handleChange}
          required
        ></textarea>
        <button>submit</button>
      </form>
    </section>
  );
}
