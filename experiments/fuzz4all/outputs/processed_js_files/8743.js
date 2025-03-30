 

const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'Complex Data Retrieved!' });
    }, 1000);
  });
};

const dataHandler = {
  get: (target, prop, receiver) => {
    print(`Accessing property "${prop}"`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value) => {
    print(`Setting property "${prop}" to "${value}"`);
    return Reflect.set(target, prop, value);
  }
};

const main = async () => {
  try {
    print('Fetching data...');
    const data = await fetchData();
    const proxiedData = new Proxy(data, dataHandler);

    print(proxiedData.data);

    proxiedData.newProperty = 'Newly Added';
    print(proxiedData.newProperty);
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
