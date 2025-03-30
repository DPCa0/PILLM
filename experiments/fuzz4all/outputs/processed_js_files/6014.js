 

 
const logger = {
  get: (target, property) => {
    print(`Accessing property: ${property}`);
    return target[property];
  }
};

const user = new Proxy({ name: "Alice", age: 30 }, logger);

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

 
async function* paginate(url, limit) {
  let page = 1;
  while (true) {
    const data = await fetchData(`${url}?page=${page}&limit=${limit}`);
    if (data.length === 0) break;
    yield data;
    page++;
  }
}

 
const sym = Symbol('uniqueId');

 
class ItemManager {
  #items = [];

  addItem(item) {
    this.#items.push(item);
  }

  listItems() {
    return this.#items;
  }
}

 
function tag(strings, ...values) {
  return strings.raw.reduce((result, string, i) => 
    `${result}${string}${values[i] ? `**${values[i]}**` : ''}`
  , '');
}

const message = tag`Hello, ${user.name}! Your unique ID is: ${sym.toString()}`;

 
(async () => {
  const manager = new ItemManager();
  manager.addItem({ id: 1, name: "Item 1" });
  print(manager.listItems());

  try {
    const pages = paginate('https://jsonplaceholder.typicode.com/posts', 10);
    for await (const page of pages) {
      print(page);
    }
  } catch (error) {
    console.error('Fetching error:', error);
  }

  print(message);
  print(`User age: ${user.age}`);  
})();
