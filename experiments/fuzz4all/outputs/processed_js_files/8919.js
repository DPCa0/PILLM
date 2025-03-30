 
const dataStructure = {
  users: [
    { id: 1, name: "Alice", roles: ["admin", "user"], settings: { theme: "dark" } },
    { id: 2, name: "Bob", roles: ["user"], settings: { theme: "light" } },
    { id: 3, name: "Charlie", roles: ["editor", "user"], settings: { theme: "light" } }
  ]
};

 
const handler = {
  get(target, prop) {
    if (prop === "users") {
      print("Accessed users");
      return target[prop];
    }
    return target[prop];
  },
  set(target, prop, value) {
    if (prop === "users") {
      print("Users updated");
    }
    target[prop] = value;
    return true;
  }
};

const proxyDataStructure = new Proxy(dataStructure, handler);

 
const printUserDetails = (users) => {
  users.forEach(({ id, name, roles, settings: { theme } }) => {
    print(`User ${id}: ${name} - Roles: ${roles.join(", ")} - Theme: ${theme}`);
  });
};

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(proxyDataStructure.users);
    }, 1000);
  });
};

 
(async () => {
  const users = await fetchData();
  printUserDetails(users);
})();
