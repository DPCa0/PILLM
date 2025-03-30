 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Getting value of ${property}: ${target[property]}`);
      return target[property];
    }
    throw new ReferenceError(`Property "${property}" does not exist.`);
  },
  set(target, property, value) {
    print(`Setting value of ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const data = { name: 'John', age: 30 };
const proxyData = new Proxy(data, handler);

 
const fetchData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const post = await response.json();
    print('Fetched Post:', post.title);
  } catch (error) {
    console.error('Fetch Error:', error);
  }
};

 
const displayUserInfo = ({ name, age }) => {
  console.log(`User Info: 
  Name: ${name}
  Age: ${age}`);
};

 
(async () => {
  proxyData.name = 'Alice';  
  displayUserInfo(proxyData);  
  await fetchData();  
})();
