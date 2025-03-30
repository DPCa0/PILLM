 
const fetchData = async () => {
   
  const getRandomData = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: Math.random() }), 1000)
    );

  try {
    const { data } = await getRandomData();
    print(`Fetched data: ${data}`);

     
    const originalArray = [1, 2, 3, 4, 5];
    const [first, second, ...rest] = originalArray;
    print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

     
    const modifiedArray = originalArray
      .map((num) => num * data)
      .filter((num) => num > 2);
    print(`Modified Array: ${modifiedArray}`);

     
    const uniqueSet = new Set(modifiedArray);
    print(`Unique Values: ${[...uniqueSet]}`);

    const cache = new WeakMap();
    cache.set(modifiedArray, data);
    print(`Cached Data: ${cache.get(modifiedArray)}`);

     
    const handler = {
      get(target, prop) {
        return prop in target ? target[prop] : 'Property does not exist';
      },
    };
    const obj = new Proxy({ key: 'value' }, handler);
    print(`Proxy Example: ${obj.key}, ${obj.nonExistent}`);

     
    function* numberGenerator() {
      yield* [1, 2, 3, 4, 5];
    }

    const gen = numberGenerator();
    print(`Generator Output: ${[...gen]}`);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
fetchData();
