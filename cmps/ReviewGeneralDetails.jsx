export function ReviewGeneralDetails({ onChange, children }) {
  return (
    <section className="review-general-details">
      <div className="review-form-item">
        <label htmlFor="rate-fullname">Full Name: </label>
        <input
          type="text"
          name="fullname"
          id="rate-fullname"
          onChange={onChange}
          required
        />
      </div>
      <div className="review-form-item">
        <label htmlFor="rate-fullname">Read At: </label>
        <input
          type="date"
          name="readAt"
          id="rate-read-at"
          onChange={onChange}
          required
        />
      </div>
      <div className="review-form-item">{children}</div>
    </section>
  );
}
