 
class Complex {
  #hiddenValue;

  constructor(value) {
    this.#hiddenValue = value;
  }

   
  multiply(factor) {
    return this.#getHiddenValue() * factor;
  }

   
  #getHiddenValue() {
    return this.#hiddenValue;
  }
}

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data fetched');
    }, 1000);
  });
}

async function process() {
  print('Start processing');
  const result = await fetchData();
  print(result);
  print('End processing');
}

 
const target = {
  message1: "Hello",
  message2: "Everyone"
};

const handler = {
  get: function(obj, prop) {
    return prop in obj ? obj[prop] : `Property ${prop} not found`;
  }
};

const proxy = new Proxy(target, handler);

 
function tag(strings, ...values) {
  return strings.raw.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, '');
}

const name = 'World';
const greeting = tag`Hello, \n${name}!`;

 
const complexInstance = new Complex(5);
print(`Multiply result: ${complexInstance.multiply(3)}`);

process();

print(proxy.message1);  
print(proxy.nonExistentProperty);  

print(greeting);
