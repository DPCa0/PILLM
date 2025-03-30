 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function complexOperations() {
  print("Start");

   
  await Promise.all([
    delay(1000).then(() => console.log("First Task Complete")),
    delay(2000).then(() => console.log("Second Task Complete")),
    delay(1500).then(() => console.log("Third Task Complete"))
  ]);

   
  const [a, b, c] = [1, 2, 3];
  const obj = { x: a, y: b, z: c };
  const { x, y, z } = obj;
  print(`Destructured values: ${x}, ${y}, ${z}`);

   
  const sum = (...numbers) => numbers.reduce((total, num) => total + num, 0);
  print("Sum:", sum(1, 2, 3, 4, 5));

   
  const greet = (name) => `Hello, ${name}!`;
  print(greet("World"));

   
  const uniqueNumbers = new Set([1, 2, 3, 2, 1]);
  for (let number of uniqueNumbers) {
    print(`Unique number: ${number}`);
  }

   
  const map = new Map();
  map.set("key1", "value1");
  map.set("key2", "value2");
  for (let [key, value] of map) {
    print(`Map entry: ${key} => ${value}`);
  }

  print("All operations complete");
}

complexOperations();
