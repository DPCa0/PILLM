 

 
const fetchData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { user: { id: 1, name: "Alice" }, status: "success" };
      Math.random() > 0.2 ? resolve(data) : reject("Fetch error");
    }, 1000);
  });

 
async function processUserData() {
  try {
    const { user: { id, name }, status } = await fetchData();
    print(`ID: ${id}, Name: ${name}, Status: ${status}`);

    const dynamicMessage = `${name}, your process completed successfully!`;
    print(dynamicMessage);
  } catch (error) {
    console.error(`Error fetching user data: ${error}`);
  }
}

 
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const uppercasedNames = users.map(({ name }) => name.toUpperCase());
print(`Uppercased Names: ${uppercasedNames.join(", ")}`);

 
processUserData();
