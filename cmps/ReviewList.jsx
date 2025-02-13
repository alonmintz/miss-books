import { AddReview } from "./AddReview.jsx";

export function ReviewList({ reviews = [], onSetReviews }) {
  const reviewsToEdit = [...reviews];
  function handleAddReview(review) {
    console.log(review);
    // reviewsToEdit.unshift(review);
    onSetReviews(review);
  }
  return (
    <section className="review-list">
      <AddReview onAddReview={handleAddReview} />
      //TODO complete review List
      <ul>
        {reviews.map((review) => (
          <li>
            <span>
              {review.type}:{review.rating}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
