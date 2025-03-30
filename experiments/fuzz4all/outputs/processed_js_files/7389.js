 

 
class Polygon {
  #sides;
  
  constructor(...sides) {
    this.#sides = sides;
  }

   
  get perimeter() {
    return this.#sides.reduce((total, side) => total + side, 0);
  }
}

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    print('Fetched data:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
(async () => {
  const triangle = new Polygon(3, 4, 5);
  print(`The perimeter of the triangle is ${triangle.perimeter}`);

   
  const config = { apiEndpoint: null };
  const endpoint = config?.apiEndpoint ?? 'https://default.api/endpoint';
  print(`Using API endpoint: ${endpoint}`);

   
  await fetchData(endpoint);
})();

 
const handler = {
  get(target, property, receiver) {
    print(`Getting property "${property}"`);
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    print(`Setting property "${property}" to "${value}"`);
    return Reflect.set(...arguments);
  }
};

const proxiedObject = new Proxy({ message: 'Hello, Proxy!' }, handler);
print(proxiedObject.message);
proxiedObject.message = 'Updated through Proxy';
