import Express from "express";
import Users from "./routes/Users";
import Transactions from "./routes/Transactions";
import swaggerUI from "swagger-ui-express";
const swaggerFIle = require("./swagger-output.json");
import Login from "./routes/Login";
const cors = require("cors");
require("dotenv").config();
import DB_Connect from "./config/sequelizeDB";
import rateLimit from "express-rate-limit";

const port = process.env.PORT || 80;

const app = Express();

const whitelist = ["https://www.rafacli.site", "https://nodeback-production-3eb4.up.railway.app"];
const corsOpts = function (req: any, callback: any) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})

app.disable('x-powered-by')
app.use(apiLimiter)
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerFIle));
app.use(cors(corsOpts));
//app.use(Express.static("public"));
require("./services/Auth");




app.use(Users);
app.use(Transactions);
app.use(Login);

app.get("/status", (req: any, res: any) => {
  res.status(200).send({ message: "Online" });
});

app.use((req: any, res: any, next: any) => {
  res.status(404).send("Resource Not Fund!");
});


DB_Connect()
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
