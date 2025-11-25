import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [signUp, setSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = async () => {
    if (signUp) {
      if (
        name.current.value === "" ||
        email.current.value === "" ||
        password.current.value === ""
      ) {
        setErrorMessage("All fields required");
        return;
      }
      const nameValue = name.current.value;
      const emailValue = email.current.value;
      const passwordValue = password.current.value;

      try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameValue,
            email: emailValue,
            password: passwordValue,
          }),
        });

        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.message);
        }
        localStorage.setItem("token", json.token);
        localStorage.setItem("user", JSON.stringify(json.user));
        const { id, name, email } = json.user;
        dispatch(addUser({ id, name, email }));
        navigate("/home");
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      if (email.current.value === "" || password.current.value === "") {
        setErrorMessage("All fields required");
        return;
      }
      const emailValue = email.current.value;
      const passwordValue = password.current.value;
      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailValue, password: passwordValue }),
        });

        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.message);
        }
        localStorage.setItem("token", json.token);
        localStorage.setItem("user", JSON.stringify(json.user));
        const { id, name, email } = json.user;
        dispatch(addUser({ id, name, email }));
        navigate("/home");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  const handleClick = () => {
    setSignUp(!signUp);
  };
  return (
    <div className="w-96 m-auto mt-36 p-6 shadow-lg">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1 className="font-bold text-3xl my-3.5">
          {signUp ? "Sign Up" : "Sign In"}
        </h1>
        {signUp && (
          <input
            ref={name}
            className="border p-2.5 mb-3 w-80 rounded-sm"
            type="text"
            placeholder="Full Name"
          ></input>
        )}
        <input
          ref={email}
          className="border p-2.5 mb-3 w-80 rounded-sm"
          type="email"
          placeholder="Email"
        ></input>
        <input
          ref={password}
          className="border p-2.5 mb-3 w-80 rounded-sm"
          type="password"
          placeholder="Password"
        ></input>
        <p className="text-red-800 font-bold">{errorMessage}</p>
        <button
          className="cursor-pointer w-80 rounded-lg mt-2.5 p-2.5 bg-blue-500"
          onClick={handleButtonClick}
        >
          {signUp ? "Sign Up" : "Sign In"}
        </button>
        <div className="cursor-pointer mt-3" onClick={handleClick}>
          {signUp ? "Already a User? Sign In" : "New to Task? Sign Up"}
        </div>
      </form>
    </div>
  );
};

export default Login;
