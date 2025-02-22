const { NavLink } = ReactRouterDOM;

export function HomePage() {
  return (
    <section className="home-page">
      <img src="assets/img/librarian.png" alt="librarian image" />
      <h1>
        Come Visit <NavLink to="/book">My Library</NavLink>
      </h1>
    </section>
  );
}
