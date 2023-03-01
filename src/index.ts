import Express from "express";
import Users from "./routes/Users";
import Transactions from "./routes/Transactions";
import swaggerUI from "swagger-ui-express";
const swaggerFIle = require("./swagger-output.json");
import Login from "./routes/Login";
const cors = require("cors");
require("dotenv").config();

const port = process.env.EXPRESS_PORT || 5000;

const app = Express();

const whitelist = ["http://localhost:5000", "http://localhost:3000"];
const corsOpts = {
  origin: (origin: any, done: any) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      done(null, true);
    } else {
      done(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors());
app.use(Express.static("public"));
require("./services/Auth");
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerFIle));




app.use(Users);
app.use(Transactions);
app.use(Login);

app.get("/status", (req: any, res: any) => {
  res.status(200).send({ message: "Online" });
});

app.use((req: any, res: any, next: any) => {
  res.status(404).send("Resource Not Fund!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
