 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ status: 200, data: { id: 1, name: 'John Doe', age: 30 } });
      } else {
        reject({ status: 404, message: 'Not Found' });
      }
    }, 1000);
  });
};

 
const processData = async (url) => {
  try {
     
    const { data } = await fetchData(url);
     
    const { name: userName, age: userAge = 25, ...otherData } = data;

     
    print(`User Info:\nName: ${userName}\nAge: ${userAge}\nOther Data: ${JSON.stringify(otherData)}`);
    
     
    const userAttributes = { userName, userAge, location: 'Unknown', role: 'Guest' };
    const { role, ...rest } = userAttributes;
    
    print(`Role: ${role}`);
    print('Additional Info:', rest);
    
  } catch (error) {
    const { status, message } = error;
    console.error(`Error ${status}: ${message}`);
  }
};

 
processData("https://api.example.com/data");
