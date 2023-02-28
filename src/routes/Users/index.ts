const express = require("express");
import passport from "passport";
const router = express.Router();
const { UserController } = require("../../controllers/Users.controller");
import { OnlyAdmin } from "../../services/middlewares/Authorization";
import ErrorHandler from "../../services/middlewares/Error";

router.use(express.json());

router.get("/users", (req: any, res: any) => {
  res.send("Its user endpoint");
});

router.get(
  "/users/user-info",
  passport.authenticate("jwt", { session: false }),
  async (req: any, res: any) => {
    try {
      const { issuer } = req.user;
      const userInfo = await UserController.findByID(issuer);
      delete userInfo.dataValues.password;
      res.status(200).send(userInfo.dataValues);
    } catch (err) {
      ErrorHandler(res, err);
    }
  }
);

router.get(
  "/users/all",
  passport.authenticate("jwt", { session: false }),
  OnlyAdmin,
  async (req: any, res: any) => {
    try {
      const response = await UserController.findAll();
      if (!response) {
        res.status(404).send("Not Found");
      } else {
        res.status(200).send(response);
      }
    } catch (err) {
      ErrorHandler(res, err);
    }
  }
);

router.get(
  "/users/email",
  passport.authenticate("jwt", { session: false }),
  OnlyAdmin,
  async (req: any, res: any) => {
    try {
      const response = await UserController.findByEmail(req.body.email);
      if (!response) {
        res.status(404).send("Not Found");
      } else {
        res.status(200).send(response);
      }
    } catch (err) {
      ErrorHandler(res, err);
    }
  }
);

router.get(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  OnlyAdmin,
  async (req: any, res: any) => {
    try {
      const userInfo = await UserController.findByPk(req.params.id);
      delete userInfo.dataValues.password;
      res.status(200).send(userInfo.dataValues);
    } catch (err) {
      ErrorHandler(res, err);
    }
  }
);

router.post("/users/register", async (req: any, res: any) => {
  const dataToRegister = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const response = await UserController.create(dataToRegister);
    delete response.dataValues.password;
    res.status(201).send(response.dataValues);
  } catch (err) {
    ErrorHandler(res, err);
  }
});

router.post(
  "/users/create-user",
  passport.authenticate("jwt", { session: false }),
  OnlyAdmin,
  async (req: any, res: any) => {
    try {
      if (req.body.role === "ADMIN") {
        res.status(403).send("Can't be more that one ADMIN user");
      } else {
        const response = await UserController.create(req.body);
        res.status(201).send(response);
      }
    } catch (err) {
      ErrorHandler(res, err);
    }
  }
);

router.post(
  "/users/add-balance",
  passport.authenticate("jwt", { session: false }),
  OnlyAdmin,
  async (req: any, res: any) => {
    try {
      const response = await UserController.userBalanceIncrement(
        req.user.issuer,
        req.body.amount
      );
      if (response === "Not Found") {
        res.status(404).send(response);
      } else {
        res.status(200).send(response);
      }
    } catch (err) {
      ErrorHandler(res, err);
    }
  }
);

router.patch(
  "/users/status-change",
  passport.authenticate("jwt", { session: false }),
  OnlyAdmin,
  async (req: any, res: any) => {
    const { id, status } = req.body;
    try {
      const user = await UserController.findByID(id);
      user.status = status;
      const response = await user.save();
      res
        .status(200)
        .send({
          message: `userId: ${response.dataValues.id} is ${response.dataValues.status} now `,
        });
    } catch (err) {
      ErrorHandler(res, err);
    }
  }
);

router.delete(
  "/users",
  passport.authenticate("jwt", { session: false }),
  OnlyAdmin,
  async (req: any, res: any) => {
    const { id } = req.body;
    try {
      await UserController.delete(id);
      res
        .status(200)
        .send({ message: `userId: ${id} was deleted successfuly` });
    } catch (err) {
      ErrorHandler(res, err);
    }
  }
);

export default router;
