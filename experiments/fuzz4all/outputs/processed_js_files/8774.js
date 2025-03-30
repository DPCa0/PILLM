 
async function complexFeatureDemo() {
   
  const fetchData = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ status: 'success', data: { value: 42 } }), 1000)
    );

   
  const { status, data: { value } } = await fetchData();  

   
  const handler = {
    get: (target, property) => {
      print(`Getting property '${property}'`);
      return target[property];
    },
    set: (target, property, value) => {
      print(`Setting property '${property}' to '${value}'`);
      target[property] = value;
      return true;
    }
  };

  const dataProxy = new Proxy({ status, value }, handler);

   
  print(`Status: ${dataProxy.status}`);  
  dataProxy.newProperty = 'added';  

  print(`Updated object:`, dataProxy);
}

complexFeatureDemo();
