 

 
function* generateNumbers() {
  let num = 1;
  while (num <= 5) {
    yield num++;
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      print(`Property '${prop}' does not exist.`);
      return null;
    }
  }
};

const targetObject = { a: 1, b: 2, c: 3 };
const proxy = new Proxy(targetObject, handler);

 
async function fetchData() {
  const fakeData = new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, data: [10, 20, 30] }), 1000);
  });

  try {
    const { success, data } = await fakeData;  
    if (success) {
      print(`Data fetched successfully: ${data.join(', ')}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
(async () => {
  print(`Iterating using a Generator:`);
  for (const number of generateNumbers()) {
    print(`Generated number: ${number}`);
  }

  print(`\nUsing Proxy:`);
  print(`proxy.a: ${proxy.a}`);  
  print(`proxy.z: ${proxy.z}`);  

  print(`\nAsync function execution:`);
  await fetchData();  
})();
