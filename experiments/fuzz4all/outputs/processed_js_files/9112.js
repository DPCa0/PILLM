 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* numberGenerator(max) {
  let num = 0;
  while (num < max) {
    await delay(500);  
    yield num++;
  }
}

 
const createLogger = obj => {
  return new Proxy(obj, {
    set(target, key, value) {
      print(`Setting ${key} to ${value}`);
      return Reflect.set(target, key, value);
    },
    get(target, key) {
      print(`Getting ${key}`);
      return Reflect.get(target, key);
    }
  });
};

 
let data = createLogger({ a: 1, b: 2 });
data.a = 42;
print(data.a);

 
(async () => {
  const generator = numberGenerator(5);
  for await (const num of generator) {
    print(`Generated number: ${num}`);
  }
})();

 
const funcKey = x => x * 2;
const funcMap = new Map();
funcMap.set(funcKey, "This is a value for a function key");
print(funcMap.get(funcKey));

 
const settings = { x: 10, y: 20, z: 30 };
const { x, ...others } = settings;
print(`x: ${x}, others:`, others);

 
function tag(strings, ...values) {
  return strings.raw.reduce((acc, str, idx) => acc + str + (values[idx] || ''), '');
}

const name = "world";
print(tag`Hello, ${name}! Here is a newline:\n`);

 
const nestedArray = [1, 2, [3, 4, [5, 6]]];
const [a, b, ...rest] = nestedArray.flat(2);
print(a, b, ...rest);
