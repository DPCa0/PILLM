 

 
async function fetchData(url) {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { name: 'Alice', age: 30, location: 'Wonderland' } });
    }, 1000);
  });
}

 
const personHandler = {
  get: function(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
};

 
(async function() {
  try {
    const url = 'https://api.example.com/user';
    const response = await fetchData(url);
    
     
    const { name, age, location } = response.data;
    print('Data fetched:', { name, age, location });

     
    const person = new Proxy({ name, age, location }, personHandler);

     
    print(`Name: ${person.name}`);
    print(`Age: ${person.age}`);
    print(`Location: ${person.location}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
