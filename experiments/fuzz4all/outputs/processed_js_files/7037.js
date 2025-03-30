 
async function* fibonacci(max) {
  let [prev, curr] = [0, 1];
  while (max-- > 0) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const handler = {
  get(target, prop) {
    print(`Accessing property: ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

let target = { num: 0 };
const proxy = new Proxy(target, handler);

 
(async () => {
  if (Math.random() > 0.5) {
    const { default: _ } = await import('lodash');
    proxy.num = _.random(1, 10);
  } else {
    proxy.num = 42;
  }

  print(`Random number (or not): ${proxy.num}`);

   
  print('Fibonacci sequence:');
  for await (const num of fibonacci(10)) {
    print(num);
  }
})();
