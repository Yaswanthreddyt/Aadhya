import bcrypt from 'bcryptjs';

const DEFAULT_SALT_ROUNDS = 10;

export const hashPassword = (password: string): string => {
  try {
    const saltRounds = Number(import.meta.env.VITE_SALT_ROUNDS) || DEFAULT_SALT_ROUNDS;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  } catch (error) {
    console.error('Error hashing password:', error);
    return bcrypt.hashSync(password, DEFAULT_SALT_ROUNDS);
  }
};

export const comparePassword = (password: string, hash: string): boolean => {
  try {
    return bcrypt.compareSync(password, hash);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
}; 