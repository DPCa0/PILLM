 

const fetchUserData = async (userId) => {
   
  const apiCall = new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockData = {
        id: userId,
        name: "John Doe",
        email: "johndoe@example.com",
        address: {
          city: "New York",
          zip: "10001"
        },
        hobbies: ["Reading", "Traveling", "Swimming"]
      };
      resolve(mockData);
    }, 1000);
  });

  try {
    const userData = await apiCall;

     
    const { name, email, address: { city }, hobbies } = userData;

     
    print(`Name: ${name}, Email: ${email}, City: ${city}`);
    
     
    const updatedHobbies = [...hobbies, "Coding"];
    print(`Hobbies: ${updatedHobbies.join(', ')}`);
    
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

 
fetchUserData(1);
