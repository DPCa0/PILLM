 

async function* asyncGenerator(limit) {
  for (let i = 0; i < limit; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(i), 100));
  }
}

async function handleAsync(generator) {
  for await (const num of generator) {
    print(`Processing number: ${num}`);
  }
}

const target = {
  message1: "Hello",
  message2: "World"
};

const handler = {
  get: (obj, prop) => {
    return prop in obj ? obj[prop] : `Property ${prop} is not found`;
  },
  set: (obj, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

(async () => {
  proxy.message3 = "JavaScript";

  const { message1, message2, message3 } = proxy;
  print(`${message1}, ${message2}! Welcome to ${message3}.`);

  const asyncGen = asyncGenerator(5);
  await handleAsync(asyncGen);
})();
