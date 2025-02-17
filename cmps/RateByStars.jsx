import { bookService } from "../services/book.service.js";
const { useState } = React;

export function RateByStars({ onAddReview, onClose }) {
  const [review, setReview] = useState(bookService.getEmptyReview("stars"));
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
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

  function handleStarClick(starNumber) {
    setSelected(starNumber);
    setReview((prevReview) => ({ ...prevReview, rating: starNumber }));
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

  const stars = [1, 2, 3, 4, 5];
  function setStarStyle(star) {
    return {
      color: (hovered || selected) >= star ? "yellow" : "lightgray",
    };
  }
  return (
    <section className="rate-by-stars">
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
        <div>
          {stars.map((star) => (
            <i
              key={star}
              className="fa fa-star"
              style={setStarStyle(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => handleStarClick(star)}
            ></i>
          ))}
        </div>
        <button>submit</button>
        {error && <p style={{ color: "red", fontSize: "1rem" }}>{error}</p>}
      </form>
    </section>
  );
  //TODO: change to user error message
}
