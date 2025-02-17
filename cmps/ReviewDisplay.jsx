export function ReviewDisplay({ review, children }) {
  return <section className="review-display">
    <h4>By: {review.fullname},Read At: {review.readAt}</h4>
    {children}
  </section>;
}
