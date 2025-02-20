const { useEffect } = React;

export function RateByTextbox({ rateType, onChange, setType }) {
  useEffect(() => {
    setType(rateType);
  }, []);

  return (
    <section className="rate-by-textbox">
      <textarea
        name="rating"
        id="rate-text"
        placeholder="Share your thoughts about the book..."
        onChange={onChange}
        required
      ></textarea>
    </section>
  );
}
