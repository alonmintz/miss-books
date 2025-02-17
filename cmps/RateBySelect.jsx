import { bookService } from "../services/book.service.js";
const { useState } = React;

export function RateBySelect({ onAddReview, onClose }) {
  const [review, setReview] = useState(bookService.getEmptyReview("select"));
  const [error, setError] = useState("");

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
    setError("");
  }

  function onSubmitReview(ev) {
    ev.preventDefault();
    if (!review.rating) {
      setError("Please select a rating.");
      return;
    }
    onAddReview(review);
    onClose();
  }

  return (
    <section className="rate-by-select">
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
        <select
          name="rating"
          id="rate-select"
          value={review.rating || ""}
          onChange={handleChange}
        >
          <option value="">Select rating</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="meh">Meh</option>
          <option value="bad">Bad</option>
        </select>
        <button>submit</button>
        {error && <p style={{ color: "red", fontSize: "1rem" }}>{error}</p>}
      </form>
    </section>
  );
}
