export function BookPreview({ book }) {
  return (
    <section className="book-preview">
      <img src={book.thumbnail} alt="Book Image" />
      <h1>{book.title}</h1>
      <h6>
        {book.listPrice.amount} {book.listPrice.currencyCode}
      </h6>
    </section>
  );
}
