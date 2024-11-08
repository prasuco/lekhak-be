import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const matchPassword = async (
  password: string,
  hashedPassword: string,
) => {
  const matched = await bcrypt.compare(password, hashedPassword);
  return matched;
};
