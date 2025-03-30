 
async function fetchData(url) {
   
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
   
  const data = await response.json();
  
   
  const transformedData = data.items.map(item => ({
    name: item.name.toUpperCase(),
    id: item.id
  }));
  
  return transformedData;
}

 
function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

class Logger {
  @readonly
  log(message) {
    print(`[LOG]: ${message}`);
  }
}

 
const objHandler = {
  set(target, property, value) {
    print(`Property ${property} set to ${value}`);
    target[property] = value;
    return true;
  }
};

const person = new Proxy({ name: 'Alice' }, objHandler);

 
(async () => {
  const logger = new Logger();
  logger.log("Fetching data...");
  
  try {
    const data = await fetchData('https://api.example.com/data');
    console.table(data);
  } catch (error) {
    logger.log(`Error: ${error.message}`);
  }

   
  try {
    logger.log = () => print("This shouldn't happen!");
  } catch (e) {
    console.warn("Readonly method alteration attempted!");
  }

   
  person.name = 'Bob';
})();
