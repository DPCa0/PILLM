 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000);
  });
};

 
const processData = async () => {
  const response = await fetchData();
  const { data } = response;

   
  const doubledData = data.map((num) => num * 2);

   
  const handler = {
    get: (target, property) => {
      print(`Accessing property "${property}"`);
      return target[property];
    },
  };

  const proxyData = new Proxy(doubledData, handler);

   
  print(proxyData[0]);  
  print(proxyData[1]);  
  print(proxyData[2]);  

  return proxyData;
};

 
processData().then((result) => print('Processed Data:', result));
