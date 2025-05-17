import { NavLink, Outlet } from "react-router-dom";

const Header = () => {
  const setActive = (isActive) => isActive ? "font-semibold" : undefined;
  return (
    <>
      <div className="bg-slate-300">
        <nav className="flex justify-between max-w-6xl px-5 py-4 mx-auto">
          <NavLink to="/">
            <h1 className="font-bold text-xl">Auth App</h1>
          </NavLink>
          <ul className="flex gap-x-10">
            <NavLink to="/" className={(isActive) => setActive(isActive)}>
              <li>Home</li>
            </NavLink>
            <NavLink to="/about" className={(isActive) => setActive(isActive)}>
              <li>About</li>
            </NavLink>
            <NavLink to="/profile" className={(isActive) => setActive(isActive)}>
              <li>Profile</li>
            </NavLink>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
