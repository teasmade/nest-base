import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = async function (password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const matchPassword = async function (
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
};
