import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const verifyPassword = async (
  signInPassword: string,
  foundPassword: string
) => {
  const isMatch = bcrypt.compareSync(signInPassword, foundPassword);

  return isMatch;
};
