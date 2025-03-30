 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
class APIError extends Error {
  constructor(message) {
    super(message);
    this.name = "APIError";
  }
}

 
class APIClient {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

   
  async fetchUserData(userId) {
    await delay(1000);  
    if (!userId) throw new APIError("Invalid user ID provided.");
     
    return { id: userId, name: "John Doe", age: 30 };
  }

   
  async postUserData(userData) {
    await delay(1000);  
    if (!userData || !userData.id) throw new APIError("Invalid user data.");
     
    return { success: true, id: userData.id };
  }
}

 
(async () => {
  const apiClient = new APIClient("https://api.example.com");

  try {
     
    const userId = 1;
    const { id, name, age } = await apiClient.fetchUserData(userId);
    print(`Fetched User: ID=${id}, Name=${name}, Age=${age}`);

     
    const updatedUserData = { id, name, age: age + 1 };  
    const { success } = await apiClient.postUserData(updatedUserData);
    
    if (success) {
      print("User data successfully updated.");
    }
  } catch (error) {
    if (error instanceof APIError) {
      console.error(`API Error: ${error.message}`);
    } else {
      console.error(`Unexpected Error: ${error.message}`);
    }
  }
})();
