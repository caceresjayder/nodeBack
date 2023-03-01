import passport from "passport";
import { OnlyAdmin } from "../../services/middlewares/Authorization";
import { TransactionController } from "../../controllers/Transaction.controller";
import { UserController } from "../../controllers/Users.controller";
const express = require("express");
const router = express.Router();
import ErrorHandler from "../../services/middlewares/Error";

router.use(express.json());

router.get("/transactions", async (req: any, res: any) => {
  res.status(200).send("It's Transactions endpoint");
});

router.get(
  "/transactions/all",
  passport.authenticate("jwt", { session: false }),
  OnlyAdmin,
  async (req: any, res: any) => {
    try {
      const transactions = await TransactionController.findAll();
      res.status(200).send(transactions);
    } catch (err) {
      ErrorHandler(res, err);
    }
  }
);

router.get(
  "/transactions/get-of-user",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res: any) => {
    
    try {
      const user = await UserController.findByID(req.user.issuer)
      const transactionsByUserEmail = await TransactionController.findAllOfUser(
        user.dataValues.email
      );
      res.status(200).send(transactionsByUserEmail);
    } catch (err) {
      ErrorHandler(res, err);
    }
  }
);

router.post(
  "/transactions/transfer",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res: any) => {
    const { issuer } = req.user;
    const { from, to, amount, concept } = req.body;
    try {
      const userFrom = await UserController.findByID(issuer);
      const userTo = await UserController.findByEmail(to);
      if (userFrom.dataValues.email === from) {
        if (!userTo) {
          res.status(404).send("User to send transfer not found");
        }
        if (userFrom.dataValues.balance >= amount) {
          await UserController.userBalanceDecrement(
            userFrom.dataValues.id,
            amount
          );
          await UserController.userBalanceIncrement(
            userTo.dataValues.id,
            amount
          );
          const trans = {
            from: userFrom.dataValues.email,
            to: userTo.dataValues.email,
            amount: amount,
            concept: concept
          };
          const transaction = await TransactionController.create(trans);
          res.status(200).send(transaction.dataValues);
        } else {
          res.status(400).send({ message: "Insufficients coins to transfer" });
        }
      } else {
        res.status(403).send("You don't have permissions to do this operation");
      }
    } catch (err) {
      ErrorHandler(res, err);
    }
  }
);

export default router;
