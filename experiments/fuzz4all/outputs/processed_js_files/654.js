 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Getting ${property}: ${target[property]}`);
      return target[property];
    }
    return undefined;
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const person = new Proxy({ name: 'Alice', age: 30 }, handler);

 
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

 
async function asyncOperation() {
  const promise = new Promise(resolve => setTimeout(() => resolve('Operation Complete'), 1000));
  print(await promise);
}

 
class Rectangle {
  #height;
  #width;
  
  constructor(height, width) {
    this.#height = height;
    this.#width = width;
  }

  get area() {
    return this.#height * this.#width;
  }

  static createSquare(sideLength) {
    return new Rectangle(sideLength, sideLength);
  }
}

 
const [a, b] = [1, 2];
const rectangle = Rectangle.createSquare(a + b);
print(`Square with sides ${a + b} has area: ${rectangle.area}`);

 
const uniqueNumbers = new Set([1, 2, 3, 3, 4]);
for (const number of uniqueNumbers) {
  print(`Unique number: ${number}`);
}

 
person.name = 'Bob';
print(person.name);

 
asyncOperation();

 
function tag(strings, ...values) {
  return strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
}

const taggedString = tag`Tagged ${'template'} literals ${'are'} powerful.`;
print(taggedString);
