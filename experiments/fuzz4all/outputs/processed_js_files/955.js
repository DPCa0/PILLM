 

const complexFunction = async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

   
  const fetchData = async () => {
    await delay(500);
    return { data: { value: 42 } };
  };

  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        return target[prop];
      } else {
        print(`Property ${prop} doesn't exist, returning default value.`);
        return 'default';
      }
    }
  };

  try {
    const response = await fetchData();
    const { data: { value } } = response; // Destructuring assignment
    const dataProxy = new Proxy({ value }, handler);

    const calculate = async value => {
      await delay(500);
      return value * 2;
    };

    const finalValue = await calculate(dataProxy.value);
    print(`Final calculated value: ${finalValue}`);
    print(`Trying to access nonexistent property: ${dataProxy.nonExistent}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

complexFunction();
