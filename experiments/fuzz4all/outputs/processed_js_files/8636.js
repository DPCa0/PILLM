 

 
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

 
const displayUser = ({ name: { first = 'John', last = 'Doe' }, email = 'No Email Provided' }) => {
  print(`User: ${first} ${last}, Email: ${email}`);
};

 
const processData = (users) => {
  return users
    .filter(({ email }) => email.includes('@'))
    .map(({ name, email }) => ({ fullName: `${name.first} ${name.last}`, email }));
};

 
class UserStore {
  #users = [];

  static userCount = 0;

  addUser(user) {
    this.#users.push(user);
    UserStore.userCount++;
  }

  getUsers() {
    return this.#users;
  }
}

 
(async () => {
  const userStore = new UserStore();
  const url = 'https://randomuser.me/api/?results=5';
  
  const { results: users } = await fetchData(url) || { results: [] };
  const processedUsers = processData(users);

  processedUsers.forEach(user => {
    displayUser(user);
    userStore.addUser(user);
  });

  print('Stored Users:', userStore.getUsers());
  print('Total User Count:', UserStore.userCount);
})();
