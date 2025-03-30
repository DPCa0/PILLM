 

 
async function fetchData(url) {
  try {
     
    const response = await fetch(url);
    const data = await response.json();

     
    const { results } = data;

     
    const formattedResults = results.map(({ name, height, mass }) => ({
      name,
      details: `Height: ${height}cm, Mass: ${mass}kg`,
    }));

    return formattedResults;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
function createWatchedObject(obj) {
  const handler = {
    get(target, prop, receiver) {
      print(`Getting property: ${String(prop)}`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      print(`Setting property: ${String(prop)} to ${value}`);
      return Reflect.set(target, prop, value, receiver);
    },
  };

   
  return new Proxy(obj, handler);
}

 
(async () => {
  const dataUrl = 'https://swapi.dev/api/people/';
  const characters = await fetchData(dataUrl);
  print('Fetched Characters:', characters);

   
  const secretKey = Symbol('secret');
  const character = createWatchedObject({
    name: 'Luke Skywalker',
    age: 22,
    [secretKey]: 'Jedi',
  });

  print(character.name);  
  character.age = 23;  
  print(character[secretKey]);  
})();
