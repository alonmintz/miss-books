export function ReviewStarsDisplay({ rating }) {
  function renderStars() {
    const stars = [];
    for (let counter = 0; counter < rating; counter++) {
      stars.push(
        <i key={counter} className="fa fa-star" style={{ color: "yellow" }}></i>
      );
    }
    return stars;
  }
  return <React.Fragment>{renderStars()}</React.Fragment>;
}
