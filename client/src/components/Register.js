import React from "react";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidate } from "../helper/validate";

import styles from "../styles/AddUser.module.css";
import { registerUser } from "../redux/api/UserApi";
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "trendyandhandy@gmail.com",
      firstName: "Amar",
      lastName: "Gupta",
      password: "Trendy&Handy21@",
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      dispatch(registerUser(values)).then((res) => {
        navigate("/login");
      });
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          {/* Heading */}
          <div className="title flex flex-col items-start">
            <h4 className="text-2xl font-bold">Register</h4>
          </div>

          <form className="py-6" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-start gap-2 w-full">
              {/* Email */}

              <div className="flex flex-col w-1/2 text-gray-500">
                <label>First Name</label>
                <input
                  {...formik.getFieldProps("firstName")}
                  type="text"
                  className={styles.textbox}
                />
              </div>
              <div className="flex flex-col w-1/2 text-gray-500">
                <label>Last Name</label>
                <input
                  {...formik.getFieldProps("lastName")}
                  type="text"
                  className={styles.textbox}
                />
              </div>
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
                <Link to="/login" className="m-2">
                  Login
                </Link>
                <button className={styles.sBtn} type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
