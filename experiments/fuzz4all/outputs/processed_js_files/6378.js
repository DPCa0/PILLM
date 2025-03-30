 
import fetch from 'node-fetch';

 
const dataProxy = new Proxy({}, {
  get: (target, name) => name in target ? target[name] : `Property '${name}' not found`
});

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    
     
    print(data?.name ?? 'Name not found');
    
     
    dataProxy.name = data.name ?? 'Anonymous';
    dataProxy.age = data.age ?? 'Unknown';

    print(`Name: ${dataProxy.name}, Age: ${dataProxy.age}`);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
(async () => {
  const url = 'https://api.github.com/users/octocat';
  await fetchData(url);

   
  print(`Fetch operation complete for: ${dataProxy.name}`);
})();
