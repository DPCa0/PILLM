 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
async function processUserData() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const users = await fetchData(url);

   
  const formattedUsers = users.map(({ id, name, email, address: { city } }) => ({
    id,
    name,
    email,
    city
  }));

   
  formattedUsers.forEach(user => {
    print(userTemplate`User: ${user.name}, Email: ${user.email}, City: ${user.city}`);
  });
}

 
function userTemplate(strings, name, email, city) {
  return `${strings[0]}${name}${strings[1]}${email}${strings[2]}${city}`;
}

 
const userSymbol = Symbol('userIdentifier');

 
const uniqueUserEmails = new Set();

processUserData().then(users => {
  users.forEach(user => {
    uniqueUserEmails.add(user.email);
    print(`User [${userSymbol.toString()}]: ${user.name}`);
  });

   
  print([...uniqueUserEmails]);
});
