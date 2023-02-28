import express from "express";
import passport from "passport";
import { signToken } from "../../services/middlewares/Token";
const router = express.Router();

router.use(express.json());

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req: any, res: any, next: any) => {
    try {
      const user = req.user;
      const payload = {
        issuer: user.id,
        role: user.role,
      };
      const token = signToken(payload);
      res.status(200).send({ token: token });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
