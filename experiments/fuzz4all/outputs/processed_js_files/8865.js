 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const processUserData = ({ name, age, hobbies }) => {
  return `Name: ${name}, Age: ${age}, Hobbies: ${hobbies.join(', ')}`;
};

 
const userMap = new Map();
userMap.set(1, { name: 'Alice', age: 30, hobbies: ['reading', 'hiking'] });
userMap.set(2, { name: 'Bob', age: 24, hobbies: ['music', 'gaming'] });

for (const [id, user] of userMap) {
  print(`User ID: ${id}`);
  print(processUserData(user));
}

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    } else {
      return `Property ${property} does not exist`;
    }
  }
};

const sym = Symbol('unique');
const userWithSymbol = { [sym]: 'Symbolic Value', name: 'Charlie', age: 29 };

const proxyUser = new Proxy(userWithSymbol, handler);
print(proxyUser[sym]);
print(proxyUser.nonExistentProp);
