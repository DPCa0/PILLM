 

 
function fetchData(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint) {
        resolve({ data: { name: 'John Doe', age: 30, skills: ['JavaScript', 'React', 'Node.js'] } });
      } else {
        reject('Invalid endpoint');
      }
    }, 1000);
  });
}

 
async function getUserData() {
  try {
    const response = await fetchData('/api/user');
    const { data } = response;
    const { name, age, skills } = data;

    print(`Name: ${name}, Age: ${age}, Skills: ${skills.join(', ')}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const handler = {
  set(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  }
};

const user = new Proxy({ name: 'Jane', age: 28 }, handler);

 
user.name = 'Jane Smith';  
user.age = 29;             

 
getUserData();
