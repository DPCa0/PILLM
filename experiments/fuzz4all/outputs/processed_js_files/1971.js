 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

 
const createLoggingProxy = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      print(`Accessed property: ${prop}`);
      return target[prop];
    },
  });
};

 
const formatOutput = (strings, ...values) => {
  return strings.reduce((result, str, i) => {
    return `${result}${str}${values[i] ? `<strong>${values[i]}</strong>` : ''}`;
  }, '');
};

 
(async () => {
  try {
    const data = await fetchData('https://api.example.com/data');
    const proxyData = createLoggingProxy(data);
    
     
    const { id = 'N/A', name = 'Anonymous', ...rest } = proxyData;

     
    print(formatOutput`Fetched data: ID = ${id}, Name = ${name}`);
    print('Additional Data:', rest);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
