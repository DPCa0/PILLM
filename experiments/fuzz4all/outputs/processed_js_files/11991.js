 
const fetchData = async (url) => {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');

     
    const data = await response.json();

     
    const processedData = new Map(
      data.map((item) => [item.id, { name: item.name, value: item.value * 2 }])
    );

     
    const handler = {
      get(target, prop, receiver) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
      },
    };

    const proxiedData = new Proxy(processedData, handler);

     
    const uniqueValues = new Set();

     
    for (let [id, obj] of proxiedData) {
      print(`ID: ${id}, Name: ${obj.name}, Value: ${obj.value}`);
      uniqueValues.add(obj.value);
    }

    print('Unique Values:', [...uniqueValues]);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
fetchData('https://jsonplaceholder.typicode.com/todos');
