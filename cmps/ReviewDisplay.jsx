export function ReviewDisplay({ review, children }) {
  return (
    <section className="review-display">
      <h6>
        {review.readAt} | {review.fullname}:
      </h6>
      {children}
    </section>
  );
}
