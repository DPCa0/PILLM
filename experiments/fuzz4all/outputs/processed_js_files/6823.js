 

 
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "John Doe",
        email: "johndoe@example.com",
        age: 30,
        hobbies: ["reading", "gaming", "hiking"],
      });
    }, 1000);
  });
};

 
const getUserData = async () => {
  try {
    const { name, email, ...rest } = await fetchUserData();
    print(`Name: ${name}, Email: ${email}`);
    return { name, email, ...rest };
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
};

 
const displayUserHobbies = ({ hobbies }) => {
  print("User's Hobbies:");
  hobbies.forEach((hobby, index) => print(`${index + 1}. ${hobby}`));
};

 
(async () => {
  const userData = await getUserData();
  if (userData) displayUserHobbies(userData);
})();
