 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      console.warn(`Property ${prop} does not exist.`);
      return Symbol.for('Property not found');
    }
  },
  set(target, prop, value, receiver) {
    if (typeof value === 'string') {
      return Reflect.set(target, prop, value, receiver);
    } else {
      throw new TypeError('Property value must be a string');
    }
  }
};

const createDynamicObject = (baseObj) => {
  return new Proxy(baseObj, handler);
};

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    const dynamicObject = createDynamicObject({ title: 'Task', status: 'Incomplete' });

    print('Fetched data:', data);

    print('Accessing existing property:', dynamicObject.title);
    print('Accessing non-existing property:', dynamicObject.nonExistentProp);

    dynamicObject.title = 'Updated Task';
    print('Updated dynamicObject title:', dynamicObject.title);

     
     
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
