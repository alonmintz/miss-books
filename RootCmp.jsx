import { BookAdd } from "./cmps/BookAdd.jsx";
import { BookDetails } from "./cmps/BookDetails.jsx";
import { BookEdit } from "./cmps/BookEdit.jsx";
import { AppHeader } from "./cmps/layout/AppHeader.jsx";
import { AboutUs } from "./pages/AboutUs.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";
import { HomePage } from "./pages/HomePage.jsx";

const Router = ReactRouterDOM.HashRouter;
const { Routes, Route, Navigate } = ReactRouterDOM;

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main className="main-layout">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/book" element={<BookIndex />}>
              <Route path="/book/:bookId" element={<BookDetails />}></Route>
            </Route>
            <Route path="/book/edit" element={<BookEdit />} />
            <Route path="/book/edit/:bookId" element={<BookEdit />} />
            <Route path="/book/add" element={<BookAdd />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>
        //TODO: add footer //TODO: add user-message
      </section>
    </Router>
  );
}
