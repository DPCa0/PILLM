 

const delay = ms => new Promise(res => setTimeout(res, ms));

function* generatorFunction() {
  yield 'Hello';
  yield 'from';
  yield 'the';
  yield 'generator!';
}

const asyncIterable = {
  [Symbol.asyncIterator]: async function* () {
    yield 'Hello,';
    await delay(1000);
    yield 'async';
    await delay(1000);
    yield 'world!';
  }
};

const personHandler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    }
    return `Property ${property} does not exist.`;
  }
};

const person = new Proxy({ name: 'John Doe', age: 30 }, personHandler);

async function displayMessages() {
  print('--- Generator Example ---');
  const gen = generatorFunction();
  let genResult;
  while (!(genResult = gen.next()).done) {
    print(genResult.value);
  }

  print('--- Async Iterator Example ---');
  for await (const message of asyncIterable) {
    print(message);
  }

  print('--- Proxy Example ---');
  print(`Name: ${person.name}`);
  print(`Age: ${person.age}`);
  print(person.nonExistentProp);   
}

displayMessages();
