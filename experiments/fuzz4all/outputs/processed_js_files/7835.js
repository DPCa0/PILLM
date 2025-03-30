 
const uniqueKey = Symbol('unique');

 
const personProxy = new Proxy(
  {
    name: 'Alice',
    age: 30,
    [uniqueKey]: 'secretData',
  },
  {
    get(target, property, receiver) {
      print(`Getting the property '${property.toString()}'`);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property === 'age' && typeof value !== 'number') {
        throw new TypeError('Age must be a number');
      }
      print(`Setting the property '${property.toString()}' to '${value}'`);
      return Reflect.set(target, property, value, receiver);
    },
  }
);

 
const { name, ...rest } = personProxy;
print('Destructured name:', name);
print('Remaining properties:', rest);

 
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i - 1] !== undefined ? `<strong>${values[i - 1]}</strong>` : '';
    return result + value + string;
  });
}

const ageTemplate = highlight`The name is ${personProxy.name} and the age is ${personProxy.age}.`;
print(ageTemplate);

 
async function fetchData() {
  const dataPromise = new Promise((resolve) => setTimeout(() => resolve('fetched data'), 1000));
  const data = await dataPromise;
  print('Async function got:', data);
}

fetchData();

 
function* numberGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const gen = numberGenerator();
print('Generated numbers:', gen.next().value, gen.next().value, gen.next().value);

 
Reflect.set(personProxy, 'age', 31);
print(`Updated age: ${personProxy.age}`);

 
print('Unique key data:', personProxy[uniqueKey]);
