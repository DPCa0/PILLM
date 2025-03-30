 
class NumberRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  *[Symbol.iterator]() {
    for (let value = this.start; value <= this.end; value++) {
      yield value;
    }
  }
}

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data fetched successfully!');
    }, 1000);
  });
}

 
(async function() {
   
  const message = await fetchData();

   
  const range = new NumberRange(1, 5);
  const numbers = [...range];
  const [first, second, ...rest] = numbers;

   
  print(`${message} Numbers range: ${first}, ${second}, [${rest.join(', ')}]`);

   
  const squaredMap = new Map(numbers.map(num => [num, num ** 2]));
  squaredMap.forEach((value, key) => print(`Square of ${key} is ${value}`));

   
  const uniqueNumbers = new Set(numbers.map(num => num * 2));
  uniqueNumbers.forEach(num => print(`Unique doubled value: ${num}`));
})();
