 
const arrayHandler = {
  get(target, prop, receiver) {
    if (typeof prop === 'string' && !isNaN(prop)) {
      print(`Accessing index ${prop}`);
    }
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    if (typeof prop === 'string' && !isNaN(prop)) {
      print(`Setting index ${prop} to ${value}`);
    }
    return Reflect.set(target, prop, value, receiver);
  },
  deleteProperty(target, prop) {
    print(`Deleting index ${prop}`);
    return Reflect.deleteProperty(target, prop);
  }
};

let numbers = [10, 20, 30];
numbers = new Proxy(numbers, arrayHandler);

 
const newItems = [40, 50];
numbers.push(...newItems);

 
async function calculateSum(array) {
  const sum = await array.reduce(async (prevPromise, cur) => {
    const prev = await prevPromise;
    return prev + cur;
  }, Promise.resolve(0));
  
  print(`Sum of array elements: ${sum}`);
}

calculateSum(numbers);

 
function* fibonacci(n) {
  let [prev, current] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield current;
    [prev, current] = [current, prev + current];
  }
}

const fibGen = fibonacci(5);
print("First 5 Fibonacci numbers:");
for (const num of fibGen) {
  print(num);
}

 
const mapExample = new Map();
['apple', 'banana', 'apple', 'orange'].forEach(fruit => {
  mapExample.set(fruit, (mapExample.get(fruit) || 0) + 1);
});

print("Fruit counts:");
mapExample.forEach((count, fruit) => {
  print(`${fruit}: ${count}`);
});
