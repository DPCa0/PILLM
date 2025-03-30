 
const fetchData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'Advanced JavaScript' };
      Math.random() > 0.2 ? resolve(data) : reject('Fetch error');
    }, 500);
  });

 
(async () => {
  try {
     
    const { id, name } = await fetchData();
    print(`Fetched data: ID=${id}, Name=${name}`);

     
    const dataMap = new Map();
    dataMap.set(id, name);

     
    const dataProxy = new Proxy(dataMap, {
      get(target, prop) {
        return target.get(Number(prop)) || 'Data not found';
      },
      set() {
        throw new Error('Data is immutable');
      },
    });

    print(`Data via Proxy: ${dataProxy[1]}`);  

     
    function* dataGenerator() {
      yield* [...target.entries()];
    }

    for (const [key, value] of dataGenerator()) {
      print(`Generator output: Key=${key}, Value=${value}`);
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
})();
