import UserModel from "../model/User.model.js";

/**
{
  "email": "example@gmail.com",
  "firstName": "bill",
  "lastName": "william"
}
 */
//  POST: http://localhost:8080/api/register
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // check for existing email
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, function (err, email) {
        if (err) reject(new Error(err));
        if (email) reject({ error: "Please use unique Email" });

        resolve();
      });
    });

    Promise.all([existEmail])
      .then(() => {
        const user = new UserModel({
          firstName,
          lastName,
          email,
        });

        // return save result as a response
        user
          .save()
          .then((result) =>
            res.status(201).send({ msg: "User Register Successfully" })
          )
          .catch((error) => res.status(500).send({ error }));
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// GET: http://localhost:8080/api/user/example123
export const getUser = async (req, res) => {
  const { email } = req.params;

  try {
    if (!email) return res.status(501).send({ error: "Invalid Email" });

    UserModel.findOne({ email }, function (err, user) {
      if (err) return res.status(500).send({ err });
      if (!user)
        return res.status(501).send({ error: "Couldn't Find the User" });

      // mongoose return unnecessary data with object so convert it into json
      const { __v, _id, ...rest } = Object.assign({}, user.toJSON());

      return res.status(201).send(rest);
    });
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
};
