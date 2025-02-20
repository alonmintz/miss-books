const { useEffect } = React;

export function RateBySelect({ rateType, onChange, setType }) {
  useEffect(() => {
    setType(rateType);
  }, []);

  return (
    <section className="rate-by-select">
      <select name="rating" id="rate-select" onChange={onChange}>
        <option value="">Reaction</option>
        <option value="excellent">Excellent</option>
        <option value="good">Good</option>
        <option value="meh">Meh</option>
        <option value="bad">Bad</option>
      </select>
    </section>
  );
}
