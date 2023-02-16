import UserModel from "../model/User.model.js";
import jwt from "jsonwebtoken";
import ENV from "../config.js";
import { readFile } from "fs/promises";

const orders = JSON.parse(
  await readFile(new URL("../database/orders.json", import.meta.url))
);
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
    const { firstName, lastName, password, email } = req.body;

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
          password,
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
/** POST: http://localhost:8080/api/login 
 * @param: {
  "email" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {
  const { email } = req.body;

  try {
    UserModel.findOne({ email })
      .then((user) => {
        // create jwt token
        const token = jwt.sign(
          {
            userId: user._id,
            username: user.username,
          },
          ENV.JWT_SECRET,
          { expiresIn: "24h" }
        );

        return res
          .status(200)
          .send({
            msg: "Login Successful...!",
            username: user.email,
            token,
          })
          .catch((error) => {
            return res.status(400).send({ error: "Password does not Match" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "Username not Found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}
// GET: http://localhost:8080/api/user/example123
export const getChartData = async (req, res) => {
  try {
    res.send([
      {
        name: "India",
        data: [3.907, 7.943, 7.848],
      },
      {
        name: "Russia",
        data: [4.743, 7.295, 7.175],
      },
      {
        name: "Germany",
        data: [0.21, 0.375, 1.161],
      },
      {
        name: "USA",
        data: [1.988, 2.733, 3.994],
      },
    ]);
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
};
export const getChartCategories = async (req, res) => {
  try {
    res.send([2022, 2023, 2034]);
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
};
export const getOrders = async (req, res) => {
  try {
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(orders));
  } catch (error) {
    return res.status(404).send({ error: "Cannot Find User Data" });
  }
};
