 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

 
function createReducer(initialValue) {
  return function (array, reducerFn) {
    return array.reduce(reducerFn, initialValue);
  };
}

 
const dataHandler = {
  get(target, property) {
    print(`Accessing property: ${property}`);
    return target[property];
  },
};

 
let person = new Proxy({ name: "Alice", age: 30 }, dataHandler);

 
(async () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const { name, email } = await fetchData(url)[0] || {};

   
  const sumReducer = createReducer(0);
  const sum = sumReducer([1, 2, 3, 4, 5], (acc, curr) => acc + curr);

  print(`Name from fetched data: ${name}, Email: ${email}`);
  print(`Sum of array: ${sum}`);
  
   
  print(`Person's name: ${person.name}`);
  print(`Person's age: ${person.age}`);
})();
