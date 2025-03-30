 

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

function* dataProcessor() {
  const data = yield fetchData('https://jsonplaceholder.typicode.com/todos/1');
  const { userId, title, completed } = data;
  yield { userId, title, completed };
}

function processAndLog(generatorFunc) {
  const iterator = generatorFunc();
  const firstYield = iterator.next().value;

  firstYield.then(data => {
    const secondYield = iterator.next(data).value;
    print('Processed Data:', secondYield);
  }).catch(err => {
    console.error('Error:', err);
  });
}

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      console.warn(`Property ${prop} does not exist on target.`);
      return null;
    }
  }
};

const proxyObject = new Proxy({ name: 'Advanced JS', type: 'Demo' }, handler);

 
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, num) => acc + num, 0);

print('Sum of numbers:', sum);
print('Proxy access:', proxyObject.name, proxyObject.nonExistent);

processAndLog(dataProcessor);
