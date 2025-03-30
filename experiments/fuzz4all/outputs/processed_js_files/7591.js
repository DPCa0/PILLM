 
(async () => {
  if (typeof window === 'undefined') {
    const { readFile } = await import('fs/promises');
    print('Running in Node.js');
    const data = await readFile(new URL(import.meta.url));
    print('Script contents:', data.toString());
  } else {
    print('Running in the browser');
  }
})();

 
class Reactive {
  constructor(obj) {
    return new Proxy(obj, {
      get(target, prop) {
        print(`Getting ${String(prop)}: ${target[prop]}`);
        return target[prop];
      },
      set(target, prop, value) {
        print(`Setting ${String(prop)} to ${value}`);
        target[prop] = value;
        return true;
      }
    });
  }
}

const state = new Reactive({ count: 0 });
state.count += 1;

 
async function* fibonacci(n) {
  let [prev, current] = [0, 1];
  while (n--) {
    yield current;
    [prev, current] = [current, prev + current];
  }
}

(async () => {
  print('Fibonacci sequence:');
  for await (const num of fibonacci(10)) {
    print(num);
  }
})();

 
function sqlTemplate(strings, ...values) {
  const query = strings.reduce(
    (prev, curr, i) => `${prev}${curr}${values[i] || ''}`,
    ''
  );
  print(`Generated SQL query: ${query}`);
  return query;
}

const id = 123;
const name = 'John Doe';
sqlTemplate`SELECT * FROM users WHERE id = ${id} AND name = ${name}`;
