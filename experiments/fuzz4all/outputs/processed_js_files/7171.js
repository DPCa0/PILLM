 
const { createRequire } = await import('module');
const require = createRequire(import.meta.url);

 
const person = {
  name: "Alice",
  age: 30,
  greet() {
    print(`Hello, my name is ${this.name}.`);
  }
};

const handler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' has been accessed.`);
    return Reflect.get(target, prop, receiver);
  }
};

const proxyPerson = new Proxy(person, handler);
proxyPerson.greet();

 
async function* fetchData() {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
  ];

  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    yield data;
  }
}

(async () => {
  for await (const data of fetchData()) {
    print(data);
  }
})();

 
const mySymbol = Symbol('unique');

const obj = {
  [mySymbol]: 'This is a unique value'
};

print(obj[mySymbol]);

 
const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
const [primary, secondary, ...others] = colors;
print(primary, secondary, others);

const combinedColors = [...colors, 'orange'];
print(combinedColors);

 
const user = {
  preferences: {
    theme: 'dark'
  }
};

const userTheme = user?.preferences?.theme ?? 'light';
print(userTheme);
