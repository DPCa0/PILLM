 

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  get magnitude() {
    return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
  }

  set setRealPart(value) {
    this.real = value;
  }

  static add(a, b) {
    return new ComplexNumber(a.real + b.real, a.imaginary + b.imaginary);
  }

  toString() {
    return `${this.real} + ${this.imaginary}i`;
  }
}

 
const complexHandler = {
  get(target, prop, receiver) {
    print(`Accessing property ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
};

const complexNumber = new Proxy(new ComplexNumber(3, 4), complexHandler);
print(complexNumber.magnitude);  

 
const numberSet = new Set([1, 2, 3, 4, 5]);
const numberMap = new Map();
numberMap.set('one', 1);
numberMap.set('two', 2);

 
function* numberGenerator() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

const numGen = numberGenerator();

print(numGen.next().value);  
print(numGen.next().value);  

 
(async () => {
  const apiData = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print(apiData);
})();

 
function sumAll(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

print(sumAll(...numberSet));  

 