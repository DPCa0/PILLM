class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* asyncGenerator(max) {
  for (let i = 0; i < max; i++) {
    yield new Promise((resolve) => setTimeout(() => resolve(i), Math.random() * 1000));
  }
}

async function complexFunction() {
  const deferred = new Deferred();

  const fetchData = () => {
    setTimeout(() => {
      const data = { status: 200, payload: { message: 'Hello, world!' } };
      deferred.resolve(data);
    }, 2000);
  };

  fetchData();

  try {
    const { status, payload } = await deferred.promise;
    if (status === 200) {
      print(payload.message);
    }

    const generator = asyncGenerator(5);
    for await (const value of generator) {
      print(`Async Value: ${value}`);
    }

    const map = new Map();
    map.set(1, 'One').set(2, 'Two').set(3, 'Three');
    const newObj = Object.fromEntries(map.entries());
    print('Object from Map:', newObj);

    const proxy = new Proxy(newObj, {
      get: (target, prop) => (prop in target ? target[prop] : `Property ${prop} not found`),
    });

    print(proxy[1]);  
    print(proxy[4]);  
  } catch (error) {
    console.error('Error:', error);
  }
}

complexFunction();
