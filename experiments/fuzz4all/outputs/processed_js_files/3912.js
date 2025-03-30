 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  await delay(1000);
  return { userId: 1, name: "John Doe", email: "john.doe@example.com" };
}

 
async function* asyncGenerator() {
  for (let i = 0; i < 3; i++) {
    yield await delay(500).then(() => i);
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' accessed`);
    return target[property];
  }
};

 
(async function main() {
  const proxyData = new Proxy(await fetchData(), handler);

  print("User ID:", proxyData.userId);
  print("Name:", proxyData.name);
  print("Email:", proxyData.email);

  for await (let value of asyncGenerator()) {
    print("Generated value:", value);
  }
})();
