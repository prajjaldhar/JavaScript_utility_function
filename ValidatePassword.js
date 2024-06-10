const isValidPassword = (password) => {
  // Regular expression for password validation
  // let reg =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return reg.test(password);
};
console.log(isValidPassword("Password@123"));
console.log(isValidPassword("pAssword@123"));
console.log(isValidPassword("Password123"));
console.log(isValidPassword("pAssword123@"));
