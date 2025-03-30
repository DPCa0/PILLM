 

 
async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

 
function processData({ id, name, completed = false }) {
  print(`Task ID: ${id}`);
  print(`Task Name: ${name}`);
  print(`Task Completed: ${completed}`);
}

 
const handler = {
  get(target, property) {
    print(`Getting ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const todo = new Proxy({}, handler);

 
(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');

   
  const { id, title: name, completed } = data;
  processData({ id, name, completed });

   
  todo.id = id;
  todo.name = name;
  todo.completed = completed;

  print(todo.name);
})();
