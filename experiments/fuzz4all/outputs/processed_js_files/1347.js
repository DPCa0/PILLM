 
function formatMessage(strings, ...values) {
  return strings.reduce((acc, str, i) => `${acc}${str}<strong>${values[i] || ''}</strong>`, '');
}

 
const person = new Proxy({ name: 'Alice', age: 25 }, {
  get(target, prop) {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
});

 
function loadModule(moduleName) {
  return import(`./modules/${moduleName}.js`)
    .then(module => module.default)
    .catch(() => console.error('Module not found'));
}

 
async function* dataFlow() {
  const module = await loadModule('math');   
  yield module.add(5, 10);
  yield person.age + module.subtract(20, 5);
}

(async () => {
  print(formatMessage`Hello, ${person.name}! You are ${person.age} years old.`);

  for await (const result of dataFlow()) {
    print(`Result: ${result}`);
  }

  person.name = 'Bob';
  print(formatMessage`Updated name: ${person.name}.`);
})();
