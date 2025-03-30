Certainly! Below is a JavaScript program utilizing advanced features like Promises, async/await, destructuring, and higher-order functions:

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
const fetchData = async () => {
  await delay(1000);  
  return { status: 200, data: { user: { id: 1, name: "Alice" }, active: true } };
};

 
const throttle = (fn, wait) => {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
    }
  };
};

 
(async () => {
  try {
    const { status, data: { user, active } } = await fetchData();
    print(`Status: ${status}`);
    print(`User: ${user.name}`);
    print(`Active: ${active}`);

     
    const throttledLog = throttle((msg) => print(msg), 2000);
    throttledLog("Attempt 1");
    throttledLog("Attempt 2");
    setTimeout(() => throttledLog("Attempt 3"), 3000);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();

This code demonstrates asynchronous operations, throttling function calls, and destructuring assignment in a practical manner.