 

function* generateNumbers() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

const asyncDouble = async num => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return num * 2;
};

const numberHandler = {
  get: async (target, prop, receiver) => {
    if (prop in target) {
      return await asyncDouble(Reflect.get(target, prop, receiver));
    } else {
      return `Property ${prop} not found`;
    }
  }
};

const main = async () => {
  const numbers = generateNumbers();
  const proxyNumbers = new Proxy({}, numberHandler);

  for (let i = 0; i < 5; i++) {
    const { value } = numbers.next();
    proxyNumbers[i] = value;
    print(`Number: ${value}, Doubled: ${await proxyNumbers[i]}`);
  }
};

main();
