import { bookService } from "../services/book.service.js";
const { useState } = React;

export function RateBySelect({ onAddReview }) {
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
    console.log({ review });
    onAddReview(review);
  }
  return (
    <section className="rate-by-select">
      <form onSubmit={onSubmitReview}>
        <select
          name="rating"
          id="rate-select"
          value={review.rating || ""}
          onChange={handleChange}
        >
          <option value="">Select rating</option>
          <option value="good">good</option>
          <option value="bad">bad</option>
        </select>
        <button>submit</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </section>
  );
}
