 

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const generateId = idGenerator();

 
async function fetchData(itemId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (itemId) {
        resolve({ id: itemId, data: `Item data for ID: ${itemId}` });
      } else {
        reject('Invalid ID');
      }
    }, 1000);
  });
}

 
const dataHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    } else {
      throw new Error(`Property ${prop} does not exist.`);
    }
  },
};

const dataObject = new Proxy({}, dataHandler);

 
(async function runProgram() {
  try {
    let id = generateId.next().value;
    const data = await fetchData(id);
    
     
    dataObject[data.id] = data.data;
    
     
    print(dataObject[1]);   
  } catch (error) {
    console.error(error);
  }
})();
