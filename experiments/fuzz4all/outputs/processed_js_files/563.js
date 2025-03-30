 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
function* numberTransformer(seed) {
  let number = seed;
  while (true) {
    number += 2;
    yield number ** 2;
  }
}

 
const handler = {
  get(target, prop) {
    print(`Getting ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const proxyObj = new Proxy({ a: 1, b: 2 }, handler);

 
(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print('Fetched Data:', data);

  const gen = numberTransformer(0);
  print('Next Transformed Number:', gen.next().value);
  print('Next Transformed Number:', gen.next().value);

  print(proxyObj.a);  
  proxyObj.a = 10;          
  print(proxyObj.a);  
})();
