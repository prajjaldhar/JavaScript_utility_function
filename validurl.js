function validateURL(url) {
  const re = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return re.test(url);
}

// Test cases
console.log(validateURL("http://localhost:8080")); // true
console.log(validateURL("http://example.com")); // true
console.log(validateURL("https://example.com")); // true
console.log(validateURL("ftp://example.com")); // true
console.log(validateURL("http://example")); // false
console.log(validateURL("example.com")); // false
console.log(validateURL("https://example.com/some/path?name=test")); // true
console.log(validateURL("http://.example.com")); // false
console.log(validateURL("ftp://example.com:21/resource")); // true
console.log(validateURL("http://example.com?param=value")); // true
console.log(validateURL("https://example.com#anchor")); // true
console.log(validateURL("https://exa mple.com")); // false
