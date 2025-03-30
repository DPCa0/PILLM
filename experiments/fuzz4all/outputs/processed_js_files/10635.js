 
async function* asyncSquareGenerator(numbers) {
  for (const num of numbers) {
    await new Promise((resolve) => setTimeout(resolve, 100));  
    yield num * num;
  }
}

 
const numbers = [1, 2, 3, 4, 5];
const numbersProxy = new Proxy(numbers, {
  get(target, prop, receiver) {
    print(`Accessing ${prop} in numbers array`);
    return Reflect.get(target, prop, receiver);
  },
});

 
const numMap = new Map(numbersProxy.map((n) => [n, n * 2]));

 
function multiplyAndLog(first, second, ...rest) {
  const product = first * second;
  print(`Product of ${first} and ${second} is: ${product}`);
  print(`Remaining numbers are: ${rest.join(", ")}`);
}

 
async function processNumbers() {
   
  for await (const square of asyncSquareGenerator(numbersProxy)) {
    print(`Square: ${square}`);
  }

   
  print("Num map values:", [...numMap.values()]);

   
  multiplyAndLog(...numbersProxy);
}

 
(async () => {
  try {
    print("Starting process...");
    await processNumbers();
    print("Process completed.");
  } catch (error) {
    console.error("Error during processing:", error);
  }
})();
