import { React, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { loading, login } = useLogin();
  const [inputs, setinputs] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setinputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login to continue
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          <div>
            <button disabled={loading} type="submit" className="btn btn-block btn-sm mt-2">
              {!loading ? (
                "Login"
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
