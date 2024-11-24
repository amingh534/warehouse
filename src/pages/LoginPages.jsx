import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogin } from "../services/mutation";
import { setCookie } from "../utils/cookie";

function LoginPages() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { mutate } = useLogin();

  const changeHandler = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };
  const showToastMessage = () => {
    toast.success("Success Registeration !");
  };

  const loginHandler = (event) => {
    event.preventDefault();

    const { username, password } = form;

    if (!username || !password) return alert("Enter Yousername and password");

    mutate(form, {
      onSuccess: (data) => {
        setCookie("token", data?.token);
        navigate("/");
      },
      onError: (error) => console.log(error.response.data.message),
    });
  };

  return (
    <form onSubmit={loginHandler}>
      <input
        type="text"
        name="username"
        placeholder="username"
        value={form.username}
        onChange={changeHandler}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={form.password}
        onChange={changeHandler}
      />
      <button type="submit" onClick={showToastMessage}>
        Login
      </button>
      <ToastContainer />
    </form>
  );
}

export default LoginPages;
