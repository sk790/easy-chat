import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function OAuth() {
  const auth = getAuth(app);
  const navigate = useNavigate();

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
        // dispatch(signInSuccess(data))
        localStorage.setItem("authUser", JSON.stringify(data));
        navigate("/");
      }
    } catch (error) {
      toast.error("Internal Server Error");
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      className="bg-gray-500 rounded-xl text-2xl p-2 text-blue-200 hover:bg-slate-200 hover:text-black transition"
    >
      {/* <AiFillGoogleCircle className="w-6 h-6 mx-2" /> */}
      <span>Continue with Google</span>
    </button>
  );
}
