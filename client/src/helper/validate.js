import toast from "react-hot-toast";

// validate Add User page
export const registerValidate = async (values) => {
  const errors = registerVerify({}, values);

  return errors;
};

// Verify Add User Data
const registerVerify = (error = {}, values) => {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = "Invalid email address";
  } else if (values.firstName.includes(" ")) {
    error.firstName = toast.error("Invalid First Name...!");
  } else if (values.lastName.includes(" ")) {
    error.lastName = toast.error("Invalid Last Name...!");
  }

  return error;
};
// validate Add User page
export const loginValidate = async (values) => {
  const errors = loginVerify({}, values);

  return errors;
};

// Verify Add User Data
const loginVerify = (error = {}, values) => {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = "Invalid email address";
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Invalid password...!");
  }

  return error;
};
