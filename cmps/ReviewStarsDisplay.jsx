export function ReviewStarsDisplay({ rating }) {
  function renderStars() {
    const stars = [];
    for (let counter = 0; counter < rating; counter++) {
      stars.push(
        <i key={counter} className="fa fa-star review-star yellow"></i>
      );
    }
    return stars;
  }
  return <section className="rate-display">{renderStars()}</section>;
}
