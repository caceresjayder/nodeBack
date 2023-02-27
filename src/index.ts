import Express from "express";
import Users from './routes/Users';
import Transactions from './routes/Transactions';
import Login from './routes/Login'

const port = 3000;

const app = Express();

app.use(Express.static("public"));
require('./services/Auth')

app.use(Users);
app.use(Transactions);
app.use(Login)

app.get("/status", (req: any, res: any) => {
  res.status(200).send({ message: "Online" });
});

app.use((req: any, res: any, next: any) => {
  res.status(404).send("Resource Not Fund!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
