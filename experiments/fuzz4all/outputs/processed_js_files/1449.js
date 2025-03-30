 

 
function* fetchDataGenerator() {
  yield new Promise((resolve) => setTimeout(() => resolve("Data 1"), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve("Data 2"), 2000));
  yield new Promise((resolve) => setTimeout(() => resolve("Data 3"), 1500));
}

 
async function runGenerator(gen) {
  let next = gen.next();
  while (!next.done) {
    const value = await next.value;
    print("Fetched:", value);
    next = gen.next();
  }
}

 
function displayUserInfo({ name = "Anonymous", age = "Unknown", country = "Unknown" }) {
  print(`User Info: Name - ${name}, Age - ${age}, Country - ${country}`);
}

 
const user = { name: "John Doe", age: 30 };

 
(async () => {
  print("Starting data fetch...");
  const dataGen = fetchDataGenerator();
  await runGenerator(dataGen);

  print("\nDisplaying user info with destructuring:");
  displayUserInfo(user);

  print("\nCombining Promises with Promise.all:");
  const [data1, data2, data3] = await Promise.all([
    new Promise((resolve) => setTimeout(() => resolve("Quick Data"), 500)),
    new Promise((resolve) => setTimeout(() => resolve("Normal Data"), 1500)),
    new Promise((resolve) => setTimeout(() => resolve("Slow Data"), 2500))
  ]);
  print(`Collected Data: ${data1}, ${data2}, ${data3}`);
})();
