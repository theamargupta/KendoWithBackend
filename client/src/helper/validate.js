import toast from "react-hot-toast";

// validate Add User page
export const AddUserValidate = async (values) => {
  const errors = AddUserVerify({}, values);

  return errors;
};

// Verify Add User Data
const AddUserVerify = (error = {}, values) => {
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
