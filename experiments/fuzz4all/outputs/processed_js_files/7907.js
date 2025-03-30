(async () => {
   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

   
  async function* fetchUserData() {
    const userData = [
      { id: 1, name: "Alice", role: "Admin" },
      { id: 2, name: "Bob", role: "User" },
      { id: 3, name: "Charlie", role: "Guest" }
    ];

    for (const data of userData) {
      await delay(1000);  
      yield data;
    }
  }

   
  const handler = {
    get(target, property) {
      print(`Accessing property '${property}'`);
      return target[property];
    }
  };

  for await (const user of fetchUserData()) {
    const { name, role } = new Proxy(user, handler);  
    print(`User: ${name}, Role: ${role}`);
  }

   
  const roles = new Set(['Admin', 'User', 'Guest']);
  print('Roles:', [...roles]);

   
  const settings = { theme: { color: null } };
  const themeColor = settings.theme?.color ?? 'default-color';
  print(`Theme Color: ${themeColor}`);
})();
