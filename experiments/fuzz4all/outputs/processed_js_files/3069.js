 
const readline = require('readline');

 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const question = (str) => new Promise(resolve => rl.question(str, resolve));

 
(async () => {
  try {
     
    let { name } = await question("What's your name? ");
    print(`Hello, ${name}! Welcome to the advanced JavaScript example.`);

    let [x, y] = [5, 10];
     
    let result = taggedCalculation`${x} + ${y} = ${x + y}`;
    print(result);

     
    let target = { value: 42 };
    let handler = {
      get: (obj, prop) => {
        print(`Getting ${prop}`);
        return prop in obj ? obj[prop] : 'default';
      }
    };
    let proxy = new Proxy(target, handler);
    print(proxy.value);  
    print(proxy.nonExistentProperty);  

     
    let map = new Map();
    map.set('key1', 'value1');
    map.set('key2', 'value2');
    print(`Map size: ${map.size}`);

    let set = new Set([1, 2, 3, 4, 5]);
    set = new Set([...set].filter(x => x % 2 === 0));
    print(`Filtered Set: ${[...set]}`);

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    rl.close();
  }
})();

 
function taggedCalculation(strings, ...values) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] !== undefined ? eval(values[i]) : ''), '');
}
