import React from "react";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { AddUserValidate } from "../helper/validate";

import styles from "../styles/AddUser.module.css";
import { registerUser } from "../redux/api/UserApi";
import { useDispatch } from "react-redux";

const AddUser = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      photoshop: false,
      illustrator: false,
      creative: false,
    },
    validate: AddUserValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
      dispatch(registerUser(values));
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          {/* Heading */}
          <div className="title flex flex-col items-start">
            <h4 className="text-2xl font-bold">Add user to your team</h4>
            <span className="py-1">
              You can add a new user below by entering their email address.
            </span>
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

              <div className="flex w-full text-gray-500">
                {/* First Name */}
                <div className="flex flex-col w-1/2 ">
                  <label>First Name (optional)</label>
                  <input
                    {...formik.getFieldProps("firstName")}
                    type="text"
                    className={styles.textbox}
                  />
                </div>
                {/* Last Name */}
                <div className="flex flex-col w-1/2 pl-6">
                  <label>Last Name (optional)</label>
                  <input
                    {...formik.getFieldProps("lastName")}
                    type="text"
                    className={styles.textbox}
                  />
                </div>
              </div>

              <div className="flex flex-col w-full py-5">
                {/* Table Heading*/}
                <h5 className="text-lg font-bold"> Assign products</h5>
                {/* Table */}
                <div className="flex flex-col">
                  <div className="flex justify-between px-4 pt-4">
                    <div>PRODUCT</div>
                    <div> LICENSES AVAILABLE</div>
                  </div>
                  {/* Table Body */}
                  <div className="border-t border-l border-r-2 border-b-2 border-black mt-2 px-4 shadow-lg">
                    <div className="flex justify-between pt-4">
                      <div>
                        <input
                          type="checkbox"
                          className="p-1"
                          {...formik.getFieldProps("photoshop")}
                        />
                        <label className="pl-2">Photoshop</label>
                      </div>
                      <div> 3 / 5</div>
                    </div>
                    <div className="flex justify-between pt-4">
                      <div>
                        <input
                          type="checkbox"
                          className="p-1"
                          {...formik.getFieldProps("illustrator")}
                        />
                        <label className="pl-2">Illustrator</label>
                      </div>
                      <div> 2 / 10</div>
                    </div>
                    <div className="flex justify-between pt-4 pb-4">
                      <div>
                        <input
                          type="checkbox"
                          className="p-1"
                          {...formik.getFieldProps("creative")}
                        />
                        <label className="pl-2">Creative Cloud</label>
                      </div>
                      <div> 1 / 10</div>
                    </div>
                  </div>
                  <a
                    className="flex justify-end w-full pt-2 underline text-sm  text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    href="/"
                    alt=""
                  >
                    Click here to buy more licenses
                  </a>
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-end w-full">
                <button className={styles.cBtn} type="cancel">
                  Cancel
                </button>
                <button className={styles.sBtn} type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
