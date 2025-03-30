 
 

const fetchData = async (url) => {
   
  const response = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: { name: "John Doe", age: 30, occupation: "Developer" } });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });

  try {
    const { data } = await response;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const processUserData = ({ name, age, occupation }) => {
   
  return `User: ${name}, Age: ${age}, Occupation: ${occupation}`;
};

(async () => {
  const url = "https://api.example.com/user";
  const userData = await fetchData(url);

  if (userData) {
    const userDescription = processUserData(userData);
    print(userDescription);
  }
})();

 
