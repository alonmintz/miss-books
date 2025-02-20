const { useState, useEffect } = React;

export function RateByStars({ rateType, onChange, setType }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setType(rateType);
  }, []);

  function handleStarClick(starNumber) {
    setSelected(starNumber);
    const starEvent = {
      target: {
        type: "number",
        name: "rating",
        value: starNumber,
      },
    };
    onChange(starEvent);
  }

  const stars = [1, 2, 3, 4, 5];
  //TODO change to className handled by state
  function setStarStyle(star) {
    return {
      //   color: (hovered || selected) >= star ? "yellow" : "lightgray",
      color: (hovered || selected) >= star ? "#fafc72" : "var(--gray3)",
    };
  }
  return (
    <section className="rate-by-stars">
      {stars.map((star) => (
        <i
          key={star}
          className="fa fa-star review-star"
          style={setStarStyle(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleStarClick(star)}
        ></i>
      ))}
    </section>
  );
}
