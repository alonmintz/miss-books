const { NavLink } = ReactRouterDOM;

export function AppHeader() {
  return (
    <header className="app-header full main-layout">
      <section>
        <h1>Ms. Books</h1>
        <nav className="app-nav">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/book">Books</NavLink>
          <NavLink to="/about">About Us</NavLink>
        </nav>
      </section>
    </header>
  );
}
