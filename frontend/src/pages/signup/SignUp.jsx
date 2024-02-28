import React from "react";
import Gender from "./Gender";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignUp from "../../hooks/useSignup";
import { FaUser } from "react-icons/fa";

const SignUp = () => {
  const [inputs, setinputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignUp();

  const handelSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
  const handleCheckboxChange = (gender) => {
    setinputs({ ...inputs, gender });
  };
  const handlechange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp to continue
        </h1>
        <form onSubmit={handelSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              value={inputs.fullName}
              onChange={handlechange}
              name="fullName"
              placeholder="Saurabh Nagar"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            
            <input
              type="text"
              value={inputs.username}
              onChange={handlechange}
              name="username"
              placeholder="Saurabh@username"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              value={inputs.password}
              onChange={handlechange}
              name="password"
              placeholder="Password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              value={inputs.confirmPassword}
              onChange={handlechange}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <Gender
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-500 mt-2 inline-block"
          >
            Already have an account?
          </Link>
          <div>
            <button
              disabled={loading}
              className="btn btn-block btn-sm mt-2 border-slate-700"
            >
              {!loading ? (
                "SignUp"
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

export default SignUp;
