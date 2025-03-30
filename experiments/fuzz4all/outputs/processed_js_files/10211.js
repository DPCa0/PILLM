 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve({ value: Math.random() * 100 }), 1000);
});

 
const dataHandler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting ${prop}: ${target[prop]}`);
      return target[prop];
    }
    return undefined;
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
     
    document.body.innerText = `Updated ${prop}: ${value}`;
    return true;
  }
};

 
const data = new Proxy({}, dataHandler);

 
(async function updateData() {
  try {
     
    const result = await fetchData();
     
    data.value = result.value;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

 
print(data.value);
