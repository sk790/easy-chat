import { React, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import OAuth from "../../components/OAuth";
import { AuthContext, AuthContextProvider } from "../../context/AuthContext";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase";

const Login = () => {
  // const { loading, login } = useLogin();
  // const [inputs, setinputs] = useState({
  //   username: "",
  //   password: "",
  // });
  const navigate = useNavigate();
  const { authUser,setauthUser } = useContext(AuthContext);
  // const handleChange = (e) => {
  //   setinputs({
  //     ...inputs,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await login(inputs);
  // };

  const auth = getAuth(app);
  // const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photoUrl: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (data.success) {
        console.log("login");
        // dispatch(signInSuccess(data))
        setauthUser(data)
        localStorage.setItem("authUser", JSON.stringify(data));
        navigate("/")
      }
    } catch (error) {
      toast.error("Internal Server Error");
      console.log(error);
    }
  };
  useEffect(() => {
    if(!authUser){
      navigate('/login')
    }
  }, [authUser]);
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      {/* <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
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
      </div> */}
      {/* <OAuth /> */}
      <button
        onClick={handleGoogleClick}
        className="bg-gray-500 rounded-xl text-2xl p-2 text-blue-200 hover:bg-slate-200 hover:text-black transition"
      >
        {/* <AiFillGoogleCircle className="w-6 h-6 mx-2" /> */}
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default Login;
