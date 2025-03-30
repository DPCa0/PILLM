const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processUserData = ({ name, email, address: { city } }) => {
  print(`Name: ${name}, Email: ${email}, City: ${city}`);
};

const main = async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/users');
    data.forEach(processUserData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

main();

 
const user = { name: 'John Doe', age: 30 };
const handler = {
  get: (target, prop, receiver) => {
    print(`Property '${prop}' accessed`);
    return Reflect.get(target, prop, receiver);
  }
};

const proxiedUser = new Proxy(user, handler);
print(proxiedUser.name);
print(proxiedUser.age);

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
print(gen.next().value);  
print(gen.next().value);  
print(gen.next().value);  

 
const settings = { theme: 'dark', notifications: true };
const { theme, ...rest } = settings;
print(theme);   
print(rest);    
