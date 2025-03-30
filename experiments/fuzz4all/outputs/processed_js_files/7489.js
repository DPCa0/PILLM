 

 
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { message: 'Hello, advanced JavaScript!' };
      resolve(data);
    }, 1000);
  });
}

 
const handler = {
  get: function(target, property) {
    print(`Accessed property: ${property}`);
    return property in target ? target[property] : 'Property not found';
  }
};

const reactiveObj = new Proxy({}, handler);

 
async function displayData() {
  try {
    const data = await fetchData();
    reactiveObj.message = data.message;
    print(reactiveObj.message);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
displayData();
