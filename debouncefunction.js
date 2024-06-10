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

// Original function to be debounced
function logMessage(message) {
  console.log("message is:", message);
}

// Standard debounce test
const debouncedLogMessage = debounce(logMessage, 2000, false);
console.log("Starting test...");

// These calls should result in only one log message after 2 seconds
debouncedLogMessage("Message 1");
debouncedLogMessage("Message 2");
debouncedLogMessage("Message 3");
debouncedLogMessage("Message 4");
debouncedLogMessage("Message 5");
debouncedLogMessage("Message 6");

// Immediate execution debounce test
const immediateDebouncedLogMessage = debounce(logMessage, 2000, true);
console.log("Starting test with immediate execution...");

// These calls should result in only the first message being logged immediately
immediateDebouncedLogMessage("Message A");
immediateDebouncedLogMessage("Message B");
immediateDebouncedLogMessage("Message C");
immediateDebouncedLogMessage("Message D");
// Wait 3 seconds to ensure the debounced functions get called
setTimeout(() => {
  console.log("Test complete.");
}, 3000);
