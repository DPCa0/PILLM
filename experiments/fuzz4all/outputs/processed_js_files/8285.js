 
const handler = {
  get: (target, prop, receiver) => {
    print(`Getting ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value, receiver) => {
    print(`Setting ${String(prop)} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const obj = new Proxy({ greeting: 'Hello', who: 'World' }, handler);

 
async function* asyncGenerator() {
  let { greeting, who } = obj;
  yield `${greeting}, ${who}!`;
  obj.who = 'JavaScript';
  ({ greeting, who } = obj);
  yield `${greeting}, ${who}!`;
}

 
(async () => {
  for await (const message of asyncGenerator()) {
    print(message);
  }
})();

 
function tag(strings, ...values) {
  return strings.reduce((result, string, i) => 
    `${result}${string.toUpperCase()}${values[i] ? values[i].toUpperCase() : ''}`, '');
}

const excitedGreeting = tag`Hello, ${obj.who}! Welcome to ${'JavaScript'}!`;
print(excitedGreeting);

 
const itemsMap = new Map([[1, 'First'], [2, 'Second'], [3, 'Third']]);
const itemsSet = new Set(['apple', 'banana', 'cherry']);

const processItems = async (map, set) => {
  const results = [];
  for (const [key, value] of map.entries()) {
    const result = await Promise.resolve(`Processed ${value}`);
    results.push(result);
  }
  for (const item of set.values()) {
    const result = await Promise.resolve(`Handled ${item}`);
    results.push(result);
  }
  return results;
};

processItems(itemsMap, itemsSet).then(console.log);
