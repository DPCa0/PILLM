 

 
const handler = {
  get(target, prop) {
    print(`Accessing ${prop}...`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);

 
function greet({ name = 'Guest', age = 18 }) {
  print(`Hello, ${name}! You are ${age} years old.`);
}

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: user, success: true });
    }, 1000);
  });
};

const main = async () => {
  user.name = 'Bob';  

  greet(user);  

  try {
    const response = await fetchData();  
    if (response.success) {
      const { data } = response;  
      print('Data fetched:', data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

main();
