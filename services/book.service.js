import { loadFromStorage, makeId, saveToStorage } from "./util.service.js";
import { storageService } from "./async-storage.service.js";
import { demoBooks } from "../models/books.js";

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
  getCurrencyCodes,
};

const STORAGE_KEY = "bookDB";

const ctgs = ["Love", "Fiction", "Poetry", "Computers", "Religion"];
const currencyCodes = ["ILS", "USD", "EUR"];

let gFilterBy = {};

_createBooks();

function query(filterBy = {}) {
  gFilterBy = { ...gFilterBy, ...filterBy };
  return storageService
    .query(STORAGE_KEY)
    .then((books) => {
      if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, "i");
        books = books.filter((book) => regExp.test(book.title));
      }
      if (filterBy.pageCount) {
        books = books.filter((book) => book.pageCount >= filterBy.pageCount);
      }
      if (filterBy.publishedDate) {
        books = books.filter(
          (book) => book.publishedDate >= filterBy.publishedDate
        );
      }
      if (filterBy.amount) {
        books = books.filter(
          (book) => book.listPrice && book.listPrice.amount >= filterBy.amount
        );
      }
      if (filterBy.currencyCode) {
        const regExp = new RegExp(filterBy.currencyCode, "i");
        books = books.filter(
          (book) => book.listPrice && regExp.test(book.listPrice.currencyCode)
        );
      }
      return books;
    })
    .catch((err) => {
      throw new Error(err);
    });
}

function get(bookId) {
  return storageService.get(STORAGE_KEY, bookId).then(_setNextPrevId);
}

function remove(bookId) {
  return storageService.remove(STORAGE_KEY, bookId);
}

function save(book) {
  if (book.id) {
    return storageService.put(STORAGE_KEY, book);
  }
  return storageService.post(STORAGE_KEY, book);
}

function getEmptyBook(
  title = "",
  pageCount = 0,
  publishedDate = 0,
  amount = 0,
  currencyCode = ""
) {
  return {
    title,
    pageCount,
    publishedDate,
    listPrice: {
      amount,
      currencyCode,
    },
  };
}

function getDefaultFilter() {
  return {
    title: "",
    pageCount: 0,
    publishedDate: 0,
    amount: 0,
    currencyCode: "",
  };
}

function getCurrencyCodes() {
  return currencyCodes;
}

function _setNextPrevId(book) {
  console.log("gFilterBy:", gFilterBy);

  return query(gFilterBy).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id);
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0];
    const prevBook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1];
    book.nextBookId = nextBook.id;
    book.prevBookId = prevBook.id;
    return book;
  });
}

function _createBooks() {
  const books = loadFromStorage(STORAGE_KEY);
  if (!books || !books.length) {
    saveToStorage(STORAGE_KEY, demoBooks);
  }
}

function _createBook() {}
