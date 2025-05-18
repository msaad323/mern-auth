import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    // Basic client-side validation
    if (!username || !email || !password) {
      return setError("All fields are required.");
    }

    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);

      if (!response.ok || data.status === false) {
        return setError(data.message || "Something went wrong.");
      }

      setFormData({ username: "", email: "", password: "" });
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Server error. Try again.");
    }
  };

  return (
    <div className="p-5 max-w-lg m-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Username"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 uppercase disabled:opacity-80 cursor-pointer"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default Signup;
