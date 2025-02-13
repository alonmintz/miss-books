import { bookService } from "../services/book.service.js";
import { utilService } from "../services/util.service.js";

const { useState, useEffect, useRef } = React;

export function BookFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const onSetFilterByDebounce = useRef(
    utilService.debounce(onSetFilterBy, 500)
  ).current;

  useEffect(() => {
    onSetFilterByDebounce(filterByToEdit);
  }, [filterByToEdit]);

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
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  const currencyCodes = bookService.getCurrencyCodes();

  return (
    <section className="book-filter">
      <fieldset>
        <legend>
          <h4>Filter</h4>
        </legend>
        <section className="filter-group">
          <section className="filter-item filter-title">
            <label htmlFor="title">Title: </label>
            <input
              id="title"
              name="title"
              type="text"
              value={filterByToEdit.title || ""}
              onChange={handleChange}
            />
          </section>
          <section className="filter-item filter-pages">
            <label htmlFor="pageCount">Minimum Pages: </label>
            <span>{filterByToEdit.pageCount || ""}</span>
            <input
              id="pageCount"
              name="pageCount"
              type="range"
              value={filterByToEdit.pageCount || 0}
              min={0}
              max={1000}
              onChange={handleChange}
            />
          </section>
          <section className="filter-item filter-year">
            <label htmlFor="publishedDate">Minimum Publish Year: </label>
            <input
              id="publishedDate"
              name="publishedDate"
              type="number"
              min={0}
              value={filterByToEdit.publishedDate || ""}
              onChange={handleChange}
            />
          </section>
        </section>
        <section className="filter-group">
          <section className="filter-item filter-price">
            <label htmlFor="amount">Minimum Price: </label>
            <span>{filterByToEdit.amount || ""}</span>
            <input
              id="amount"
              name="amount"
              type="range"
              value={filterByToEdit.amount || 0}
              min={0}
              max={500}
              onChange={handleChange}
            />
          </section>
          <section className="filter-item filter-currency">
            <label htmlFor="currencyCode">Currency: </label>
            <select
              name="currencyCode"
              id="currencyCode"
              value={filterByToEdit.currencyCode || ""}
              onChange={handleChange}
            >
              <option defaultValue="" value="">
                All
              </option>
              {currencyCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </section>
        </section>
      </fieldset>
    </section>
  );
}
