 

 
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: [1, 2, 3, 4, 5] });
    }, 1000);
  });
}

 
async function processData() {
  try {
    const response = await fetchData();
    const transformedData = response.data.map(num => num * 2);

    print("Transformed Data:", transformedData);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    }
    throw new Error(`Property '${prop}' does not exist on target`);
  },
  set: (target, prop, value) => {
    if (typeof value === 'number') {
      return Reflect.set(target, prop, value);
    }
    throw new TypeError(`Property '${prop}' must be a number`);
  }
};

const dataObject = new Proxy({ number: 10 }, handler);

try {
  print("Initial number:", dataObject.number);
  dataObject.number = 20;
  print("Updated number:", dataObject.number);

   
   
} catch (error) {
  console.error(error.message);
}

processData();
