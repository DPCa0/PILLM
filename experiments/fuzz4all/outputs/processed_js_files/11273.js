 
const dataFetcher = async (url) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockData = { id: 1, name: "John Doe" };
      resolve({ status: 200, data: mockData });
    }, 1000);
  });
};

const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      return obj[prop];
    } else {
      throw new Error(`Property ${prop} not found`);
    }
  }
};

(async () => {
  try {
    const response = await dataFetcher("https://api.example.com/user");
    if (response.status === 200) {
      const user = new Proxy(response.data, handler);
      print(`User Name: ${user.name}`);   
      print(`User ID: ${user.id}`);
      print(`Nonexistent Property: ${user.age}`);  
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
