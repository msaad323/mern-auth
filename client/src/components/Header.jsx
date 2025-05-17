import { NavLink, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="bg-slate-300">
        <nav className="flex justify-between max-w-6xl px-5 py-3 mx-auto">
          <NavLink to="/">
            <h1 className="font-bold">Auth App</h1>
          </NavLink>
          <ul className="flex gap-x-4">
            <NavLink to="/" className={({ isActive }) => isActive && "font-bold underline"}>
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => isActive && "font-bold underline"}
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) => isActive && "font-bold underline"}
            >
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
