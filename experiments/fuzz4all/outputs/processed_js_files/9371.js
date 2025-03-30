 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: { user: 'John Doe', age: 30, country: 'USA' }, status: 200 });
      } else {
        reject('No URL provided');
      }
    }, 1000);
  });
}

 
async function getUserData() {
  try {
    const { data, status } = await fetchData('https://api.example.com/user');
    if (status === 200) {
      const { user, ...rest } = data;  
      print(`User: ${user}`, rest);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Property '${prop}' accessed.`);
    return target[prop];
  },
};

const target = { name: 'Jane', age: 25 };
const proxy = new Proxy(target, handler);

getUserData();  
print(proxy.name);  

 
const originalObj = { x: 1, y: 2 };
const newObj = { ...originalObj, z: 3 };
print('Original:', originalObj);
print('New:', newObj);
