// import { AddReview } from "./AddReview.jsx";
import { ReviewDisplay } from "./ReviewDisplay.jsx";
import { ReviewSelectDisplay } from "./ReviewSelectDisplay.jsx";
import { ReviewStarsDisplay } from "./ReviewStarsDisplay.jsx";
import { ReviewTextDisplay } from "./ReviewTextDisplay.jsx";

export function ReviewList({ reviews = [], onRemoveReview }) {
  return (
    <section className="review-list">
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <button
              className="remove-btn"
              onClick={() => onRemoveReview(review.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
            <ReviewDisplay review={review}>
              <DynamicReviewDisplay
                reviewType={review.type}
                rating={review.rating}
              />
            </ReviewDisplay>
          </li>
        ))}
      </ul>
    </section>
  );
}

function DynamicReviewDisplay({ reviewType, rating }) {
  const reviewMap = {
    select: <ReviewSelectDisplay rating={rating} />,
    stars: <ReviewStarsDisplay rating={rating} />,
    text: <ReviewTextDisplay rating={rating} />,
  };
  return reviewMap[reviewType];
}
