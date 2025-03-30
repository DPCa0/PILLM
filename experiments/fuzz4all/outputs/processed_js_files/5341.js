const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok.');
  return response.json();
};

const transformData = (data) => {
  return data.map(item => ({
    ...item,
    fullName: `${item.firstName} ${item.lastName}`,
    dateOfBirth: new Date(item.dob).toLocaleDateString(),
  }));
};

const displayData = (data) => {
  const container = document.createElement('div');
  container.classList.add('data-container');
  data.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('data-item');
    itemElement.innerHTML = `
      <p>Name: ${item.fullName}</p>
      <p>DOB: ${item.dateOfBirth}</p>
    `;
    container.appendChild(itemElement);
  });
  document.body.appendChild(container);
};

(async () => {
  try {
    const url = 'https://api.example.com/users';
    const rawData = await fetchData(url);
    const transformedData = transformData(rawData);
    displayData(transformedData);
  } catch (error) {
    console.error('Failed to load data:', error);
  }
})();

 
const user = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30
};

const handler = {
  get: (target, property) => {
    print(`Accessing property "${property}"`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property "${property}" to "${value}"`);
    target[property] = value;
  }
};

const proxyUser = new Proxy(user, handler);
print(proxyUser.firstName);
proxyUser.age = 31;
print(proxyUser.age);

 
const UNIQUE_KEY = Symbol('uniqueKey');
const obj = {
  [UNIQUE_KEY]: 'This is a unique value',
  commonKey: 'Common value'
};

print(obj[UNIQUE_KEY]);  
print(Object.keys(obj));  
