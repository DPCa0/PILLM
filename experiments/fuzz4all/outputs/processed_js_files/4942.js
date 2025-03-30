 
const randomDelay = (message, delay = Math.random() * 2000) =>
  new Promise(resolve => setTimeout(() => resolve(message), delay));

 
async function complexFunction() {
  try {
    const [result1, result2, result3] = await Promise.all([
      randomDelay("Task 1 complete", 1000),
      randomDelay("Task 2 complete", 2000),
      randomDelay("Task 3 complete", 1500)
    ]);

    print(result1);
    print(result2);
    print(result3);

     
    function* numberGenerator() {
      yield* [1, 2, 3, 4, 5];
    }

    const sum = Array.from(numberGenerator()).reduce((acc, curr) => acc + curr, 0);
    print(`Sum of numbers: ${sum}`);

     
    const person = { name: "Alice", age: 30, city: "Wonderland" };
    const { name, ...rest } = person;
    print(`Name: ${name}, Other info:`, rest);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

 
(async () => {
  await complexFunction();
})();
