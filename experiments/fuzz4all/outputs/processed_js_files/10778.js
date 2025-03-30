class Animal {
  constructor(name) {
    this.name = name;
  }

  sound() {
    print(`${this.name} makes a sound`);
  }
}

const dogProxy = new Proxy(new Animal('Dog'), {
  get(target, prop, receiver) {
    if (prop === 'sound') {
      return () => print(`${target.name} barks!`);
    }
    return Reflect.get(...arguments);
  },
});

async function* fibonacci(n) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < n; i++) {
    [prev, curr] = [curr, prev + curr];
    yield prev;
  }
}

const addAsync = async (...args) => {
  const sum = args.reduce((acc, val) => acc + val, 0);
  return new Promise((resolve) => setTimeout(() => resolve(sum), 1000));
};

(async () => {
  print("Animal Sound:");
  dogProxy.sound();

  print("\nFibonacci Series:");
  for await (const num of fibonacci(5)) {
    print(num);
  }

  print("\nAsync Addition:");
  const result = await addAsync(1, 2, 3, 4, 5);
  print(`Sum: ${result}`);
})();
