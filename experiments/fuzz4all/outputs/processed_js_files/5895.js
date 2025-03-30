 
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

 
const createReactiveObject = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      print(`Accessing property '${prop}'`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      print(`Setting property '${prop}' to '${value}'`);
      return Reflect.set(target, prop, value, receiver);
    }
  });
};

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Fetched data:', data);
  } catch (error) {
    console.error('Fetching error:', error);
  }
}

 
const sequence = infiniteSequence();
const reactiveObject = createReactiveObject({ name: 'Advanced JS' });

print(sequence.next().value);  
print(sequence.next().value);  

reactiveObject.name = 'JS Magic';  
print(reactiveObject.name);  

fetchData('https://api.github.com');  
