// Throttle function to limit the number of requests per second

function throttle(func, limit) {
  let inThrottle;
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    return new Promise((resolve, reject) => {
      if (!inThrottle) {
        func
          .apply(context, args)
          .then((result) => {
            resolve(result);
            lastRan = Date.now();
            inThrottle = true;
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(async function () {
          if (Date.now() - lastRan >= limit) {
            try {
              const result = await func.apply(context, args);
              resolve(result);
              lastRan = Date.now();
            } catch (error) {
              reject(error);
            }
          }
        }, limit - (Date.now() - lastRan));
      }
    });
  };
}

// Async function to fetch data using Fetch API with error handling
async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Test function to demonstrate usage
async function testFetch() {
  // Throttle to limit the number of requests per second
  const throttledFetch = throttle(fetchData, 3000); // 1 request per second

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
