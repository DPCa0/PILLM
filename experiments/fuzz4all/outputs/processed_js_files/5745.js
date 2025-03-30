 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { user: { name: "Alice", age: 30 } } });
    }, 1000);
  });
};

 
const processUserData = async () => {
  try {
    const { data: { user: { name, age } } } = await fetchData();
    print(`Fetched user: ${name}, age: ${age}`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
(async () => {
  await processUserData();
})();
