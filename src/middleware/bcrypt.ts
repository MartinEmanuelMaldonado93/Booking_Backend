import bcrypt from "bcryptjs";

/**Creates encrypted password */
export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

/** Check if it's valid */
export const verifyPassword = async (
  signInPassword: string,
  foundPassword: string
) => {
  const isMatch = bcrypt.compareSync(signInPassword, foundPassword);

  return isMatch;
};
