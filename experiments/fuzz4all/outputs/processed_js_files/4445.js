 
 

async function fetchData(url) {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        name: 'John Doe',
        age: 29,
        profession: 'Software Engineer'
      };
      resolve(data);
    }, 1000);
  });
}

const fetchUserData = async (url) => {
  try {
    const { name, age, profession } = await fetchData(url);
    print(`User fetched: ${name}, ${age}, ${profession}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    } else {
      return `Property ${property} not found`;
    }
  }
};

const user = new Proxy({}, handler);

user.name = 'Jane Doe';
user.age = 32;

print(user.name);  
print(user.height);  

fetchUserData('https://example.com/api/user');
