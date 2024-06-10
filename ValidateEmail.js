function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[a-z]{2,3}$/;
  return re.test(String(email).toLowerCase());
}

console.log(validateEmail("prajjaldhar@google.com")); // true
console.log(validateEmail("example@domain.in")); // true
console.log(validateEmail("user@website.org")); // true
console.log(validateEmail("invalid@domain.xyz")); // true
console.log(validateEmail("wrong@domain.co.uk")); // false
console.log(validateEmail("invalid@domain.c")); // false
