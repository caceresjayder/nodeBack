import bcrypt from "bcrypt";
import { config } from "../../config/config";

const BCRYPT_ROUNDS = parseInt(`${config.BCRYPT_ROUNDS}`);

const PasswordHash = async (password: string) => {
  return await bcrypt.hash(password, BCRYPT_ROUNDS);
};

const PasswordVerify = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export { PasswordHash, PasswordVerify };
