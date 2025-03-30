const apiCallSimulator = () => 
  new Promise((resolve) => setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000));

const processData = async () => {
  const { data } = await apiCallSimulator();
  return data.map(x => x * 2);
};

const printData = async () => {
  const processedData = await processData();
  print('Processed Data:', processedData);

   
  const uniqueData = new Set([...processedData, 10, 12, 14]);
  print('Unique Data:', [...uniqueData]);

   
  const handler = {
    get: (target, prop) => {
      print(`Accessing property '${prop}'`);
      return target[prop];
    }
  };

  const proxiedData = new Proxy([...uniqueData], handler);
  proxiedData.forEach(value => print(value));
};

printData();
