 

 
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

 
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

 
const targetObject = {
  name: 'Alice',
  age: 30
};

const handler = {
  get: (target, property) => {
    print(`Getting property: ${property}`);
    return target[property];
  }
};

const proxy = new Proxy(targetObject, handler);

 
const MyModule = (() => {
  let privateVar = 'I am private';

  return {
    publicMethod: () => console.log(privateVar),
    changePrivateVar: (newVal) => privateVar = newVal
  };
})();

 
(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print(data);

  const sequence = generateSequence(1, 5);
  for (let value of sequence) {
    print(value);
  }

  print(proxy.name);
  print(proxy.age);

  MyModule.publicMethod();
  MyModule.changePrivateVar('New private value');
  MyModule.publicMethod();
})();
