 
function html(strings, ...values) {
  return strings.reduce((acc, str, idx) => 
    `${acc}${str}${values[idx] ? String(values[idx]).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""}`, "");
}

 
const handler = {
  get(target, prop) {
    print(`Property '${prop}' accessed`);
    return Reflect.get(target, prop);
  }
};

const user = new Proxy({ name: "John <Doe>", age: 30 }, handler);

 
const { name, age } = user;
print(html`Name: ${name}, Age: ${age}`);

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

fetchData('https://jsonplaceholder.typicode.com/users/1')
  .then(data => console.log(`Fetched user: ${data.name}`))
  .catch(error => console.error(`Fetching failed: ${error.message}`));

 
function* fibonacci(n, current = 0, next = 1) {
  if (n === 0) return;
  yield current;
  yield* fibonacci(n - 1, next, current + next);
}

 
print([...fibonacci(10)]);

 
function readOnly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  @readOnly
  get area() {
    return Math.PI * this.radius ** 2;
  }
}

const circle = new Circle(5);
print(`Circle area: ${circle.area}`);
 
