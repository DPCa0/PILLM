 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

 
async function fetchData(url) {
  try {
     
    let response = await fetch(url);
    if (!response.ok) {
      throw new CustomError(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof CustomError) {
      console.error("Custom error occurred:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
}

 
function* dataGenerator(dataArray) {
  for (let data of dataArray) {
    yield data;
  }
}

 
function createLoggingProxy(target) {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Accessing property: ${prop}`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Setting property ${prop} to ${value}`);
      obj[prop] = value;
      return true;
    }
  });
}

 
(async () => {
  const url = 'https://api.spacexdata.com/v4/launches/latest';
  
   
  const data = await fetchData(url);
  if (!data) return;
  
   
  const dataGen = dataGenerator(Object.entries(data));
  
   
  const logObject = createLoggingProxy({ name: 'SpaceX', mission: 'Starlink' });

  print('Start iteration over data:');
  for (let entry of dataGen) {
    print(entry);
  }
  
  print('Manipulating proxy object:');
  print(logObject.name);
  logObject.mission = 'Mars';
})();
