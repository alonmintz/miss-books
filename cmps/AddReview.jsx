import { RateBySelect } from "./RateBySelect.jsx";
import { RateByStars } from "./RateByStars.jsx";
import { RateByTextbox } from "./RateByTextbox.jsx";
import { bookService } from "../services/book.service.js";
import { ReviewGeneralDetails } from "./ReviewGeneralDetails.jsx";

const { useState } = React;

export function AddReview({ onAddReview, toggleReview }) {
  const [selectedRateType, setSelectedRateType] = useState("stars");
  const [review, setReview] = useState(bookService.getEmptyReview());
  const [error, setError] = useState("");

  const handleRadioChange = ({ target }) => {
    setSelectedRateType(target.value);
  };

  function setReviewType(type) {
    setReview((prevReview) => ({ ...prevReview, type }));
  }
  function handleReviewChange({ target }) {
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

  function evStop(ev) {
    ev.stopPropagation();
  }

  function onReviewSubmit(ev) {
    ev.preventDefault();
    if (!review.rating || review.rating === "") {
      setError("Please Choose Your Rating");
      return;
    }
    onAddReview(review);
    toggleReview();
  }

  return (
    <section className="add-review" onClick={toggleReview}>
      <section className="review-modal" onClick={evStop}>
        <button className="close-btn" onClick={toggleReview}>
          X
        </button>
        <h3>Rate by:</h3>
        <section className="radio">
          <input
            type="radio"
            id="byStars"
            name="rateTypes"
            value="stars"
            onChange={handleRadioChange}
            checked={selectedRateType === "stars"}
          />
          <label htmlFor="byStars">Stars</label>
          <input
            type="radio"
            id="bySelect"
            name="rateTypes"
            value="select"
            onChange={handleRadioChange}
            checked={selectedRateType === "select"}
          />
          <label htmlFor="bySelect">Reaction</label>

          <input
            type="radio"
            id="byTextbox"
            name="rateTypes"
            value="text"
            onChange={handleRadioChange}
            checked={selectedRateType === "text"}
          />
          <label htmlFor="byTextbox">Text</label>
        </section>
        <form onSubmit={onReviewSubmit}>
          <DynamicReview
            rateType={selectedRateType}
            onChange={handleReviewChange}
            setType={setReviewType}
          />
          <button>Submit</button>
          {error && <p style={{ color: "red", fontSize: "1rem" }}>{error}</p>}
        </form>
      </section>
    </section>
  );
}
function DynamicReview(props) {
  const rateTypeMap = {
    select: <RateBySelect {...props} />,
    text: <RateByTextbox {...props} />,
    stars: <RateByStars {...props} />,
  };
  return (
    <ReviewGeneralDetails {...props}>
      {rateTypeMap[props.rateType]}
    </ReviewGeneralDetails>
  );
}
