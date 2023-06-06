import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/config.js";
import router from "./router/route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const port = 8080;

// hppt get request
app.get("/", (req, res) => {
  res.status(201).json("Home Get Request");
});

// Api Route

app.use("/api", router);

// start Server only when we have valid connection
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("cannnot connect to server");
    }
  })
  .catch((error) => {
    console.log("cannnot connect to server");
  });
