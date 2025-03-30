 

 
async function* fetchGenerator(urls) {
  for (const url of urls) {
    yield await fetch(url).then(res => res.json());
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting property ${prop}`);
      return Reflect.get(target, prop, receiver);
    } else {
      console.warn(`${prop} not found on target`);
      return 'N/A';
    }
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
const person = new Proxy({ name: 'Alice', age: 30 }, handler);

 
function* profileGen() {
  yield `Name: ${person.name}`;
  yield `Age: ${person.age}`;
  yield `City: ${person.city}`;  
}

(async function() {
  const dataUrls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];

  const dataGen = fetchGenerator(dataUrls);

  for await (const data of dataGen) {
    print('Fetched Data:', data.title);
  }

  const profileIterator = profileGen();
  print(profileIterator.next().value);  
  person.city = 'New York';  
  print(profileIterator.next().value);
  print(profileIterator.next().value);
})();
