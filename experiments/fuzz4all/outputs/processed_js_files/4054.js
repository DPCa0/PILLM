 

 
const mockApi = {
  fetchData: () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ user: { name: "John", age: 30 }, skills: ["JS", "React"] }), 1000)
    ),
};

async function getUserData() {
  try {
     
    const response = await mockApi.fetchData();

     
    const {
      user: { name, age },
      skills,
    } = response;

     
    print(`User Info: Name - ${name}, Age - ${age}`);
    
     
    const updatedSkills = [...skills, "Node.js", "GraphQL"];
    print(`User Skills: ${updatedSkills.join(', ')}`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getUserData();
