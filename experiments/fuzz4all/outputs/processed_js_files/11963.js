 

 
const fetchData = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 1000));

 
const dbData = {
  users: [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' },
  ],
  settings: { theme: 'dark', notifications: true },
};

(async () => {
  try {
     
    const { users, settings } = await fetchData(dbData);

     
    const { default: applyTheme } = await import(`./themes/${settings.theme}`);

     
    applyTheme();

     
    const newUser = { id: 3, name: 'Charlie', role: 'guest' };
    const updatedUsers = [...users, newUser];

     
    const [admin, ...otherUsers] = updatedUsers.filter(user => user.role === 'admin');

    print('Admin User:', admin);
    print('Other Users:', otherUsers);

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

 
export default function applyTheme() {
  document.body.style.background = '#333';
  document.body.style.color = '#fff';
  print('Dark theme applied!');
}

Note: The code assumes the existence of a `themes` directory with a `dark.js` file for dynamic imports, which would need to be created in a real environment.