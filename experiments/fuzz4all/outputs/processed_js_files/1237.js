 

 
const fetchData = (url) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { user: "Alice", age: 30, city: "Wonderland" };
      Math.random() > 0.2 ? resolve(data) : reject("Fetch error");
    }, 1000);
  });

 
async function processData(url) {
  try {
    const { user, ...rest } = await fetchData(url);
    print(`User: ${user}, Details:`, rest);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
const logMultipleMessages = (...messages) => {
  print("Logging multiple messages:");
  messages.forEach((message, index) => print(`${index + 1}: ${message}`));
};

 
(async function main() {
  print("Starting Process...");
  
  await processData("https://example.com/api/data");
  
  const messages = ["Hello", "world", "this", "is", "JavaScript"];
  logMultipleMessages(...messages);

  print("Process Finished.");
})();
