export function ReviewSelectDisplay({ rating }) {
  function renderRating() {
    switch (rating) {
      case "excellent":
        return <h2>🤩</h2>;
      case "good":
        return <h2>🙂</h2>;
      case "meh":
        return <h2>😐</h2>;
      case "bad":
        return <h2>👎</h2>;
    }
  }

  return <section className="rate-display">{renderRating()}</section>;
}
