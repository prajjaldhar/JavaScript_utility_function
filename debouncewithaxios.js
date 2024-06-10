const axios = require("axios");

async function fetchDataWithAxios(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Define an async function to wrap the debounced API call
const debouncedFetchData = debounce(
  async function (url) {
    const data = await fetchDataWithAxios(url);
    console.log("Data:", data);
  },
  2000,
  false
); // Adjust debounce delay as needed

// Usage example
console.log("Starting test...");

// These API calls should be debounced and only the last one will be executed after 2 seconds
debouncedFetchData("https://api.example.com/data");
debouncedFetchData("https://api.example.com/data");
debouncedFetchData("https://api.example.com/data");
debouncedFetchData("https://api.example.com/data");

// Wait for the debounced function to execute
setTimeout(() => {
  console.log("Test complete.");
}, 3000); // Wait a bit longer to ensure the debounced function has time to execute
