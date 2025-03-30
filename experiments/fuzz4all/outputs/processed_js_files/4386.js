 
class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    const response = await fetch(this.url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
}

const processData = async () => {
  const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com/posts');
  try {
    const data = await fetcher.fetchData();
    const [firstPost, ...otherPosts] = data;
    print(`First Post:`, firstPost);
    print(`Number of other posts:`, otherPosts.length);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const logHandler = {
  get(target, prop, receiver) {
    print(`Getting property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const user = new Proxy({ name: 'Alice', age: 30 }, logHandler);

print(user.name);  
user.age = 31;  

 
const uniqueValues = new Set([1, 2, 3, 4, 4, 5]);
print(uniqueValues);

const userMap = new Map();
userMap.set('id', 1);
userMap.set('name', 'Alice');

for (const [key, value] of userMap) {
  print(`${key}: ${value}`);
}

 
processData();
