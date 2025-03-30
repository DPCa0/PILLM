 

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

 
const handler = {
  get: function(target, property) {
    return property in target ? target[property] : `Property ${property} not found`;
  }
};
const dataProxy = new Proxy({}, handler);

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGen = idGenerator();

 
const createUser = ({name, age, ...rest}) => ({
  id: idGen.next().value,
  name,
  age,
  ...rest
});

 
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => `${acc}${str}<strong>${values[i] || ''}</strong>`, '');
}

const userInfo = (user) => highlight`Name: ${user.name}, Age: ${user.age}, ID: ${user.id}`;

 
const userMap = new Map();

(async function() {
  try {
    const userData = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    const user = createUser(userData);
    userMap.set(user.id, user);

    print(userInfo(user));

     
    user.email = userData.email;
    print(dataProxy.email);  
    print(user.email);  

  } catch (error) {
    console.error('Fetching data failed:', error);
  }
})();
