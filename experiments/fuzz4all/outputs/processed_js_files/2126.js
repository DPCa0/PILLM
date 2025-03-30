class Observable {
  constructor(obj) {
    return new Proxy(obj, {
      set(target, property, value) {
        print(`Setting value '${value}' to '${property}'`);
        target[property] = value;
        return true;
      },
      get(target, property) {
        print(`Getting value of '${property}': ${target[property]}`);
        return target[property];
      }
    });
  }
}

function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

const asyncOperation = async (num) => {
  return new Promise(resolve => {
    setTimeout(() => {
      print(`Resolved async operation for number: ${num}`);
      resolve(num * num);
    }, 1000);
  });
};

const main = async () => {
  const observableObj = new Observable({ a: 1, b: 2 });
  const gen = numberGenerator();

  observableObj.a = 10;
  print(observableObj.a);

  for (let i = 0; i < 3; i++) {
    let { value } = gen.next();
    let squared = await asyncOperation(value);
    print(`Squared value: ${squared}`);
  }
};

main();
