 

 
const privateKey = Symbol('privateKey');

 
function* numberSequence(start = 1) {
  let current = start;
  while (true) {
    yield current++;
  }
}

 
const handler = {
  get(target, property) {
    if (property === privateKey) {
      return 'Access Denied';
    }
    return property in target ? target[property] : 'Property does not exist';
  },
  set(target, property, value) {
    if (property === privateKey) {
      throw new Error('Cannot modify private property');
    }
    target[property] = value;
    return true;
  }
};

 
const person = {
  name: 'John Doe',
  age: 30,
  [privateKey]: 'secretValue',
  numberSequence: numberSequence(10),
};

const proxiedPerson = new Proxy(person, handler);

 
async function complexOperation() {
  try {
    print(`Name: ${proxiedPerson.name}`);
    print(`Age: ${proxiedPerson.age}`);

     
    print(`Private Key Access Attempt: ${proxiedPerson[privateKey]}`);

     
    proxiedPerson.name = 'Jane Doe';
    print(`Updated Name: ${proxiedPerson.name}`);

     
    print('Sequence:');
    for (let i = 0; i < 5; i++) {
      print(proxiedPerson.numberSequence.next().value);
    }

     
    await new Promise(resolve => setTimeout(resolve, 1000));
    print('Async operation completed');

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

 
complexOperation();
