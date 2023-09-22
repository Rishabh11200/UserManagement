export const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?!\s).{8,}$/;
  return passwordRegex.test(password);
};
