 

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ status: 200, data: { users: ["Alice", "Bob", "Charlie"], count: 3 } });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
};

 
const processUserData = async () => {
  try {
    const url = "https://api.example.com/data";
    const response = await fetchData(url);  
    
    if (response.status === 200) {
      const { users, count } = response.data;  
      const userList = [...users, "Dave", "Eve"];  
      
      print(`Total Users (including additions): ${userList.length}`);
      print(`User List: ${userList.join(", ")}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

 
processUserData();
