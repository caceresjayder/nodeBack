const express = require("express");
import passport from "passport";
const router = express.Router();
const { UserController } = require("../../controllers/Users.controller");
import { OnlyAdmin, OnlyUser, OnlyWorker } from "../../services/Authorization";

router.use(express.json());

router.get("/users", (req: any, res: any) => {
  res.send("Its user endpoint");
});

router.post("/users/register", async (req: any, res: any) => {
  const dataToRegister = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const response = await UserController.create(dataToRegister);
    res.status(201).send(response);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

router.post(
  "/users/createUser",
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
      res.status(500).send(err.toString());
    }
  }
);

router.patch(
  "/users/addBalance",
  passport.authenticate("jwt", { session: false }),
  OnlyAdmin,
  async (req: any, res: any) => {
    try {
      const response = await UserController.update(req.body.id, {
        balance: req.body.amount,
      });
      if (response === "Not Found") {
        res.status(404).send(response);
      } else {
        res.status(200).send(response);
      }
    } catch (err) {
      res.status(500).send("Operation not complete");
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
      res.status(500).send(err.toString());
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
      res.status(500).send(err);
    }
  }
);

router.get("/users/:id", async (req: any, res: any) => {});

export default router;
