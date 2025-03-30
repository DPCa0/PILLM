 
import { promises as fs } from 'fs';

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Fetched data from ${url}`), 1000);
  });
};

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Accessed property: ${prop}`);
      return obj[prop];
    }
  });
};

 
(async () => {
  const data = await fetchData('https://example.com');
  
   
  const { default: axios } = await import('axios');
  const response = await axios.get('https://api.github.com/users/octocat');

   
  const taggedTemplate = (strings, ...values) => {
    return strings.reduce((acc, str, idx) => `${acc}${str}<${values[idx] || ''}>`, '');
  };

  print(taggedTemplate`Data: ${data}, User: ${response.data.login}`);

   
  const obj = createLoggingProxy({ a: 10, b: 20 });
  print(obj.a);  

   
  await fs.writeFile('output.txt', taggedTemplate`Data: ${data}, User: ${response.data.login}`);
})();
