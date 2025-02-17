import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook());
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { bookId } = useParams();

  useEffect(() => {
    if (bookId) loadBook();
  }, [bookId]);

  function loadBook() {
    setIsLoading(true);
    bookService
      .get(bookId)
      .then(setBookToEdit)
      .catch((err) => {
        console.log(`Error loading book Id ${bookId}`, err);
        navigate("/book");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onClose() {
    navigate("/book");
  }

  function evStop(ev) {
    ev.stopPropagation();
  }

  function handleChange({ target }) {
    let { value, name: field } = target;

    switch (target.type) {
      case "range":
      case "number":
        value = +target.value;
        break;
      case "checkbox":
        value = target.checked;
        break;
    }
    setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }));
  }

  function handleChangeListPrice({ target }) {
    const { type, name: field } = target;
    let { value } = target;

    switch (type) {
      case "range":
      case "number":
        value = +value;
        break;

      case "checkbox":
        value = target.checked;
        break;
    }

    setBookToEdit((prevBook) => ({
      ...prevBook,
      listPrice: { ...prevBook.listPrice, [field]: value },
    }));
  }

  function onSaveBook(ev) {
    ev.preventDefault();
    bookService
      .save(bookToEdit)
      .then((book) => {
        console.log(`Book ${book.id} was successfully Saved.`);
      })
      .catch((err) => {
        console.log("Error saving book: ", err);
      })
      .finally(navigate("/book"));
  }

  const loadingClass = isLoading ? "loading" : "";
  const currencyCodes = bookService.getCurrencyCodes();

  return (
    <section className="modal-backdrop" onClick={onClose}>
      <section
        className={`book-edit modal-content ${loadingClass}`}
        onClick={evStop}
      >
        <h1>{bookId ? "Edit" : "Add"} Book</h1>
        <form onSubmit={onSaveBook}>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            value={bookToEdit.title}
            onChange={handleChange}
          />
          <label htmlFor="pageCount">Page Count: </label>
          <input
            id="pageCount"
            name="pageCount"
            type="number"
            value={bookToEdit.pageCount || ""}
            min={0}
            onChange={handleChange}
          />
          <label htmlFor="publishedDate">Publish Year: </label>
          <input
            id="publishedDate"
            name="publishedDate"
            type="number"
            value={bookToEdit.publishedDate || ""}
            min={0}
            onChange={handleChange}
          />
          <label htmlFor="amount">Price: </label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={bookToEdit.listPrice.amount || ""}
            min={0}
            onChange={handleChangeListPrice}
          />
          <label htmlFor="currencyCode">Currency: </label>
          <select
            name="currencyCode"
            id="currencyCode"
            value={bookToEdit.listPrice.currencyCode || "ILS"}
            onChange={handleChangeListPrice}
          >
            {currencyCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <label htmlFor="isOnSale">On Sale: </label>
          <input
            onChange={handleChangeListPrice}
            checked={bookToEdit.listPrice.isOnSale}
            id="isOnSale"
            type="checkbox"
            name="isOnSale"
          />
          <button>Save</button>
        </form>
      </section>
    </section>
  );
}
