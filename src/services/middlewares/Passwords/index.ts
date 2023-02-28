import bcrypt from "bcrypt";

const BCRYPT_ROUNDS = parseInt(`${process.env.BCRYPT_SALT}`);

const PasswordHash = async (password: string) => {
  return await bcrypt.hash(password, BCRYPT_ROUNDS);
};

const PasswordVerify = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export { PasswordHash, PasswordVerify };
