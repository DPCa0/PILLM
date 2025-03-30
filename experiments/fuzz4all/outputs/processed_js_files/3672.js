 

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

 
const [first, second, ...rest] = [1, 2, 3, 4, 5];

 
const target = {
  message: 'Hello, Advanced JavaScript!',
};

const handler = {
  get(obj, prop) {
    print(`Property ${prop} was accessed.`);
    return obj[prop];
  },
};

const proxy = new Proxy(target, handler);

 
(async () => {
   
  const ids = idGenerator();
  print('Generated ID:', ids.next().value);
  print('Generated ID:', ids.next().value);

   
  try {
    const apiData = await fetchData('https://api.example.com/data');
    print('Fetched Data:', apiData);
  } catch (error) {
    console.error('Fetch Error:', error);
  }

   
  print(proxy.message);

   
  print('First:', first);
  print('Second:', second);
  print('Rest:', rest);
})();
