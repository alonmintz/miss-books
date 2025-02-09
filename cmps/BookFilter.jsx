import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React;

export function BookFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilterBy(filterByToEdit);
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
        <label htmlFor="title">Title:</label>
        <input id="title" name="title" type="text" onChange={handleChange} />
        <label htmlFor="pageCount">Minimum Pages:</label>
        <input
          id="pageCount"
          name="pageCount"
          type="range"
          value={filterByToEdit.pageCount || 10}
          min={10}
          max={1000}
          onChange={handleChange}
        />
        <span>{filterByToEdit.pageCount || 10}</span>

        <label htmlFor="publishedDate">Minimum Publish Year:</label>
        <input
          id="publishedDate"
          name="publishedDate"
          type="number"
          min={0}
          value={filterByToEdit.publishedDate || ""}
          onChange={handleChange}
        />
        <label htmlFor="amount">Minimum Price:</label>
        <input
          id="amount"
          name="amount"
          type="range"
          value={filterByToEdit.amount || 0}
          min={10}
          max={500}
          onChange={handleChange}
        />
        <span>{filterByToEdit.amount || 0}</span>
        <label htmlFor="currencyCode">Currency</label>
        <select name="currencyCode" id="currencyCode" onChange={handleChange}>
          <option defaultValue="" value="">
            All
          </option>
          {currencyCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </fieldset>
    </section>
  );
}
