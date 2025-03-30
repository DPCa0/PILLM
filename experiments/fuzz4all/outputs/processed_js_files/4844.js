class MathUtilities {
   
  static average = (...nums) => nums.reduce((a, b) => a + b, 0) / nums.length;
}

async function fetchData(url) {
   
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print(data?.results ?? 'No results');
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

const proxyHandler = {
   
  get(target, prop) {
    if (prop in target) {
      print(`Property "${prop}" accessed with value: ${target[prop]}`);
      return target[prop];
    } else {
      console.warn(`Property "${prop}" does not exist`);
      return undefined;
    }
  },
  set(target, prop, value) {
    print(`Property "${prop}" set to value: ${value}`);
    target[prop] = value;
    return true;
  },
};

const obj = new Proxy({ name: 'JavaScript', year: 1995 }, proxyHandler);

 
const printInfo = ({ name, year }) => print(`Language: ${name}, Year: ${year}`);

(async () => {
  print(`Average: ${MathUtilities.average(10, 20, 30, 40)}`);
  await fetchData('https://pokeapi.co/api/v2/pokemon?limit=1');
  
  obj.name;
  obj.year = 2023;
  printInfo(obj);
})();
