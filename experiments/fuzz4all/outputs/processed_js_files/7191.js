 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ userId: 1, userName: 'JohnDoe', data: [1, 2, 3] });
    }, 1000);
  });
};

 
async function processData() {
  try {
    const data = await fetchData();
    print('Fetched Data:', data);

     
    const dataProxy = new Proxy(data, {
      get(target, property) {
        print(`Accessing property "${property}"`);
        return target[property];
      }
    });

    print('User ID:', dataProxy.userId);
    print('User Name:', dataProxy.userName);

     
    const transformedData = dataProxy.data.map(item => item * 10).filter(item => item > 10);
    print('Transformed Data:', transformedData);
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

processData();
