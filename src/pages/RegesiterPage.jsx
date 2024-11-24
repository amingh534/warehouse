import React, { useState } from "react";
import { useRegister } from "../services/mutation";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegesiterPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm_Password: "",
  });
  const navigate = useNavigate();
  const { mutate } = useRegister();
  const showToastMessage = () => {
    toast.success("Success Registeration !");
  };
  
  const changeHandler = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  const registerHandler = (event) => {
    event.preventDefault();

    const { username, password, confirm_Password } = form;

    if (password !== confirm_Password) return alert("Passwords must exact");

    if (!username || !password) return alert("Enter Yousername and password");

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          console.log(data.data.message);
          navigate("/login");
        },
        onError: (error) => console.log(error.response.data.message),
      }
    );
  };

  return (
    <div>
      <form onSubmit={registerHandler}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={changeHandler}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={changeHandler}
        />
        <input
          name="confirm_Password"
          type="password"
          placeholder="Confirm Password"
          value={form.confirm_Password}
          onChange={changeHandler}
        />
        <button type="submit" onClick={showToastMessage}>Register</button>
        <ToastContainer/>
      </form>
      
    </div>
  );
}

export default RegesiterPage;
