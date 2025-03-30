 
class MathUtil {
  constructor() {
    this.history = [];
  }

   
  add = (...numbers) => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    this.history.push(`add(${numbers.join(', ')}) = ${sum}`);
    return sum;
  };

  multiply = (...numbers) => {
    const product = numbers.reduce((acc, num) => acc * num, 1);
    this.history.push(`multiply(${numbers.join(', ')}) = ${product}`);
    return product;
  };

   
  get operationHistory() {
    return this.history;
  }

   
  static fibonacci(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    return (memo[n] = MathUtil.fibonacci(n - 1, memo) + MathUtil.fibonacci(n - 2, memo));
  }
}

 
const { add, multiply } = new MathUtil();
const nums = [3, 5, 7];
const sum = add(...nums);
const product = multiply(...nums);

print(`Sum: ${sum}`);  
print(`Product: ${product}`);

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print(data);
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
  }
}

 
(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  const fetchPromises = urls.map(url => fetchData(url));
  await Promise.all(fetchPromises);
})();

 
function* numberGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const gen = numberGenerator();
print(gen.next().value);  
print(gen.next().value);  
print(gen.next().value);  

 
const mathProxy = new Proxy(new Math