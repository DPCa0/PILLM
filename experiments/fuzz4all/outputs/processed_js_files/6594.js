(async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

   
  const handler = {
    get: (obj, prop) => {
      return prop in obj ? obj[prop] : `Property ${prop} does not exist`;
    },
    set: (obj, prop, value) => {
      if (typeof value === 'number') {
        obj[prop] = value;
        return true;
      } else {
        throw new TypeError('Property value must be a number');
      }
    }
  };

  const dynamicObject = new Proxy({}, handler);
  dynamicObject.a = 10;
  print(dynamicObject.a);  
  print(dynamicObject.b);  

   
  const myIterable = {
    [Symbol.iterator]: function* () {
      yield 1;
      yield 2;
      yield 3;
    }
  };

  for (const value of myIterable) {
    print(value);  
  }

   
  const person = {
    name: 'Alice',
    age: 30,
  };

  const { name, age, city = 'Unknown' } = person;
  print(name, age, city);  

  try {
     
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print(data);  
  } catch (error) {
    console.error('Fetch error:', error);
  }
})();
