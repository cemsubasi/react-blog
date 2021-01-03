import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";
import { url3 } from "../Data";
import "../signin.css";
import logo from "../logo1.svg";

export function LoginBody() {
  const context = useContext(BlogContext);

  const [auth, setAuth] = useState({ userName: "", password: "" });
  const setAuthHandler = (e) => {
    setAuth({ ...auth, [e.target.id]: e.target.value });
  };
  const setAdminState = (arg) => {
    context.setIsAdmin(arg);
  };
  const submit = () => {
    axios
      .post(url3, auth)
      .then((res) => {
        setAdminState(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <div className="form-signin">
        <img className="mb-4" src={logo} alt="" width="150" height="120" />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <label htmlFor="userName" className="visually-hidden">
          Username
        </label>
        <input
          type="text"
          id="userName"
          className="form-control"
          value={auth.userName}
          onChange={setAuthHandler}
          placeholder="Username"
          required
          autoFocus
        />
        <label htmlFor="inputPassword" className="visually-hidden">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control mb-5"
          value={auth.password}
          onChange={setAuthHandler}
          placeholder="Password"
          required
        />
        <Link to="/supers">
          <button
            className="w-100 btn btn-lg "
            onClick={submit}
            style={{ background: "#FFAB00" }}
            type="submit">
            {" "}
            Sign in{" "}
          </button>
        </Link>
        <p className="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
      </div>
    </div>
  );
}
