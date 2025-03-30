 
const fetchData = async (url) => {
   
  await new Promise(resolve => setTimeout(resolve, 2000));
  if (!url) throw new Error('URL is required!');
  return { data: 'Sample Data', status: 200 };
};

 
const target = { message: 'Hello, Proxy!' };
const handler = {
  get: (obj, prop) => {
    print(`Accessing property "${prop}"`);
    return prop in obj ? obj[prop] : `Property "${prop}" not found!`;
  }
};
const proxy = new Proxy(target, handler);

 
(async () => {
  try {
    const results = await Promise.all([
      fetchData('https://api.example.com'),
      fetchData(),  
    ]);
    print('Fetched data:', results?.[0]?.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
  
   
  print(proxy.message);  
  print(proxy.nonExistentProperty);  
})();
