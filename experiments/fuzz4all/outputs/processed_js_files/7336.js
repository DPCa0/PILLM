 

const fetchData = async () => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
    }, 1000);
  });
};

async function* dataGenerator() {
  while (true) {
    const data = await fetchData();
    yield data;
  }
}

const handler = {
  get(target, prop, receiver) {
    if (prop === 'email') {
      return 'Access Denied!';
    }
    return Reflect.get(target, prop, receiver);
  }
};

const main = async () => {
  const gen = dataGenerator();

  for await (const data of gen) {
    const proxyData = new Proxy(data, handler);
    const { id, name, email } = proxyData;

    print(`ID: ${id}, Name: ${name}, Email: ${email}`);

     
    break;
  }
};

main();
