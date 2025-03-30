 
const secret = Symbol('secret');

 
const createSafeObject = (obj) => new Proxy(obj, {
  get(target, prop) {
    if (prop === secret) {
      throw new Error("Access to secret property is denied");
    }
    return target[prop];
  },
  set(target, prop, value) {
    if (prop === secret) {
      throw new Error("Modification of secret property is denied");
    }
    target[prop] = value;
    return true;
  }
});

 
async function* asyncCounter(limit) {
  let count = 0;
  while (count < limit) {
    yield new Promise(resolve => setTimeout(() => resolve(count++), 100));
  }
}

 
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => (
    `${result}${str}<span class="highlight">${values[i] || ''}</span>`
  ), '');
}

 
(async function main() {
  const data = createSafeObject({
    name: "John Doe",
    [secret]: "SuperSecret"
  });

  try {
    print(data.name);  
    print(data[secret]);  
  } catch (error) {
    console.error(error.message);
  }

  const highLightedMessage = highlight`Hello, ${data.name}! Welcome to the ${"JS World"}`;
  print(highLightedMessage);

  print("Async Counter:");
  for await (const num of asyncCounter(5)) {
    print(num);
  }
})();
