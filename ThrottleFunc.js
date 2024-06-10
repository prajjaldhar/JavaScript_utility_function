function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this,
      args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Define a function to be throttled
function sayHello() {
  console.log("Hello");
}

// Throttle the function to be called at most once every 3000 milliseconds (3second)
const throttledFunction = throttle(sayHello, 3000);

// Call the throttled function multiple times in quick succession
throttledFunction(); // This should execute immediately
throttledFunction(); // This should be throttled and not execute immediately
throttledFunction(); // This should also be throttled
// After 3000 milliseconds, calling the function again should execute immediately
setTimeout(throttledFunction, 3000);

// This throttle function is used to limit the rate at which a function can be executed. It ensures that the function is not called more than once within a specified time interval (limit).

// It takes two parameters:

// func: The function to be throttled.
// limit: The time interval (in milliseconds) within which the function can only be called once.
// Inside the returned function:

// It captures the context (this) and arguments of the function call.
// It checks if the function was last called (lastRan) or if it hasn't been called yet. If it hasn't been called, it immediately executes the function and updates lastRan to the current time.
// If the function has been called before, it clears any existing timeout (lastFunc) to prevent previous calls from executing. Then it sets a new timeout, which will execute the function after the remaining time of the throttling interval has elapsed. However, if the time elapsed since the last function call exceeds the throttle limit (limit), it executes the function immediately and updates lastRan.
