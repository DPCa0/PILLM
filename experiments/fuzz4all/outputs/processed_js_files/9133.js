 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(['apple', 'banana', 'cherry', 'apple']), 1000);
  });
};

const processData = async () => {
  const data = await fetchData();
  const uniqueData = [...new Set(data)];

  const handler = {
    get: (target, property) => {
      if (property in target) {
        return target[property];
      } else {
        return `No such property: ${property}`;
      }
    },
  };

  const proxyData = new Proxy(uniqueData, handler);

  print(proxyData[0]);  
  print(proxyData[3]);  

  const [first, second] = proxyData;
  print(`First: ${first}, Second: ${second}`);  
};

processData();
