 
const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
const handler = {
  get: function(target, property) {
    print(`Getting property: ${property}`);
    return property in target ? target[property] : 'Property not found';
  },
  set: function(target, property, value) {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
  }
};

 
const targetObject = { name: "John Doe", age: 30 };
const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.name;   
proxyObject.location = "Unknown";   

 
function* numberSequence() {
  let number = 0;
  while (true) {
    yield number++;
  }
}

 
const sequence = numberSequence();
print(sequence.next().value);   
print(sequence.next().value);   

 
(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print('Fetched Data:', data);
})();
