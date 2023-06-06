import React from "react";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { loginValidate } from "../helper/validate";

import styles from "../styles/AddUser.module.css";
import { loginUser } from "../redux/api/UserApi";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "trendyandhandy@gmail.com",
      password: "Trendy&Handy21@",
    },
    validate: loginValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      
      let loginPromise = await loginUser(values);
      console.log(loginPromise.token)
      localStorage.setItem("token", loginPromise.token);
      navigate("/home");
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          {/* Heading */}
          <div className="title flex flex-col items-start">
            <h4 className="text-2xl font-bold">Login</h4>
          </div>

          <form className="py-6" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-start gap-2 w-full">
              {/* Email */}
              <div className="flex flex-col w-1/2 text-gray-500">
                <label>Enter Email</label>
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  className={styles.textbox}
                />
              </div>
              <div className="flex flex-col w-1/2 text-gray-500">
                <label>password</label>
                <input
                  {...formik.getFieldProps("password")}
                  type="text"
                  className={styles.textbox}
                />
              </div>
              {/* Submit Button */}
              <div className="flex justify-start w-full">
                <Link to="/" className="m-2">
                  Register
                </Link>
                <button className={styles.sBtn} type="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
