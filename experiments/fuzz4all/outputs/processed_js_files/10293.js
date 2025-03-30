 
async function fetchData(apiUrl) {
   
  await new Promise(resolve => setTimeout(resolve, 1000));
  return fetch(apiUrl)
    .then(response => response.json())
    .catch(error => console.error('Error fetching data:', error));
}

 
const userProfile = {
  name: 'Alice',
  age: 25,
  occupation: 'Engineer'
};

const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Getting ${property}: ${target[property]}`);
      return target[property];
    } else {
      console.warn(`Property "${property}" does not exist.`);
      return undefined;
    }
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const proxiedUserProfile = new Proxy(userProfile, handler);

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
const userIDs = new Set();
const idGen = idGenerator();

 
for (let i = 0; i < 5; i++) {
  userIDs.add(idGen.next().value);
}

 
const { name, ...otherDetails } = proxiedUserProfile;
print('Name:', name);
print('Other Details:', otherDetails);

 
fetchData('https://api.example.com/data')
  .then(data => console.log('Fetched Data:', data))
  .catch(error => console.error('Error:', error));

 
print('Unique User IDs:', [...userIDs]);

 
proxiedUserProfile.age = 26;  
print(proxiedUserProfile.name);  
print(proxiedUserProfile.nonExistentProp);  
