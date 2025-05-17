import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="p-5 max-w-lg m-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Username"
          id="Username"
        />
        <input
          type="email"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Email"
          id="Email"
        />
        <input
          type="password"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Password"
          id="Password"
        />
        <button className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 uppercase disabled:opacity-80 cursor-pointer">
          Sign Up
        </button>
        <button className="bg-red-600 p-3 rounded-lg text-white hover:opacity-85 uppercase disabled:opacity-80 cursor-pointer">
          Continue with Google
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
