import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export async function comperedPass(hashPassword,password) {
    const isMatch =await bcrypt.compare(hashPassword,password)
    return isMatch;
}

