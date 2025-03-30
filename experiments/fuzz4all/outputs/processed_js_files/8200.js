const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processData = ({ data }) => {
  const { values } = data;
  const squaredValues = values.map(val => val ** 2);
  const filteredValues = squaredValues.filter(val => val % 2 === 0);
  return filteredValues.reduce((acc, curr) => acc + curr, 0);
};

(async () => {
  try {
    const url = 'https://api.example.com/data';
    const rawData = await fetchData(url);

    const complexObject = {
      rawData,
      transformed: processData(rawData),
      [Symbol.iterator]: function* () {
        let index = 0;
        while (index < this.transformed) {
          yield index++;
        }
      },
      get summary() {
        return `Total: ${this.transformed}`;
      }
    };

    const iterableResults = [...complexObject];
    print(`Summary: ${complexObject.summary}`);
    print('Iterable Results:', iterableResults);

    const proxyHandler = {
      get: (target, prop) => {
        if (prop in target) {
          print(`Property "${prop}" accessed`);
          return target[prop];
        } else {
          throw new ReferenceError(`Property "${prop}" does not exist`);
        }
      }
    };

    const proxiedObject = new Proxy(complexObject, proxyHandler);
    print(proxiedObject.summary);

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
