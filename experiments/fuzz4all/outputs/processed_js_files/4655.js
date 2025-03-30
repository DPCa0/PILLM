 
 

const fetchData = async (url) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Alice", role: "admin" },
        { id: 2, name: "Bob", role: "user" },
        { id: 3, name: "Charlie", role: "admin" },
      ]);
    }, 1000);
  });
};

(async () => {
  try {
    const data = await fetchData("https://example.com/api/users");

    const roleMap = data.reduce((map, { id, name, role }) => {
      if (!map.has(role)) {
        map.set(role, new Set());
      }
      map.get(role).add({ id, name });
      return map;
    }, new Map());

    roleMap.forEach((users, role) => {
      print(`Role: ${role}`);
      users.forEach(({ id, name }) => {
        print(`  - ID: ${id}, Name: ${name}`);
      });
    });

     
    const [firstAdmin, ...others] = [...roleMap.get("admin")];
    print(`\nFirst Admin: ${firstAdmin.name}`);

    const { name: firstUserName } = [...roleMap.get("user")][0];
    print(`First User: ${firstUserName}`);

     
    const allUsers = [...roleMap.values()].reduce(
      (acc, set) => [...acc, ...set],
      []
    );
    print("\nAll Users Combined:");
    print(allUsers);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
