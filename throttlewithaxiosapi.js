const axios = require("axios");

// Throttle function to limit the number of requests per second
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Async function to fetch data using Axios with error handling
async function fetchDataWithAxios(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Test function to demonstrate usage
async function testFetch() {
  // Throttle to limit the number of requests per second
  const throttledFetch = throttle(fetchDataWithAxios, 1000); // 1 request per second

  // Test with multiple requests
  console.log("Starting requests...");
  console.log(
    await throttledFetch("https://jsonplaceholder.typicode.com/posts/1")
  );
  console.log(
    await throttledFetch("https://jsonplaceholder.typicode.com/posts/2")
  );
  console.log(
    await throttledFetch("https://jsonplaceholder.typicode.com/posts/3")
  );
  console.log("Requests completed.");
}

// Call the test function
testFetch();
