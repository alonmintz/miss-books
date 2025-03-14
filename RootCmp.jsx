import { BookAdd } from "./cmps/BookAdd.jsx";
import { BookDetails } from "./cmps/BookDetails.jsx";
import { BookEdit } from "./cmps/BookEdit.jsx";
import { AppFooter } from "./cmps/layout/AppFooter.jsx";
import { AppHeader } from "./cmps/layout/AppHeader.jsx";
import { UserMsg } from "./cmps/UserMsg.jsx";
import { AboutUs } from "./pages/AboutUs.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { AboutTeam } from "./cmps/AboutTeam.jsx";
import { AboutGoal } from "./cmps/AboutGoal.jsx";

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
            <Route path="/about" element={<AboutUs />}>
              <Route path="/about/team" element={<AboutTeam />} />
              <Route path="/about/goal" element={<AboutGoal />} />
            </Route>
          </Routes>
        </main>
        <AppFooter />
        <UserMsg />
      </section>
    </Router>
  );
}
