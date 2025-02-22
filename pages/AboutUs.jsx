const { NavLink, Outlet } = ReactRouterDOM;

export function AboutUs() {
  return (
    <section className="about">
      <nav>
        <NavLink to="/about/team">The Team</NavLink> |{" "}
        <NavLink to="/about/goal">The Goal</NavLink>
      </nav>
      <Outlet />
    </section>
  );
}
