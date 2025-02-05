const Router = ReactRouterDOM.HashRouter;
const { Routes, Route, Navigate } = ReactRouterDOM;

export function App() {
  return (
    <Router>
      <section className="app">
        <main className="main-layout">
          <Routes></Routes>
        </main>
        //TODO: add footer
      </section>
    </Router>
  );
}
