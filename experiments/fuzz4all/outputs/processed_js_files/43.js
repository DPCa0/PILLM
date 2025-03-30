 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "Alice", age: 30, hobbies: ["Reading", "Hiking", "Cooking"] });
    }, 1000);
  });
};

 
(async () => {
  try {
     
    const data = await fetchData();
    
     
    const { name, age, ...rest } = data;
    
     
    console.log(`User Info: 
      Name: ${name} 
      Age: ${age} 
      Other: ${JSON.stringify(rest)}`);
    
     
    const hobbiesMap = new Map();
    data.hobbies.forEach((hobby, index) => {
      hobbiesMap.set(index, hobby);
    });

     
    print("User's Hobbies:");
    for (let [index, hobby] of hobbiesMap.entries()) {
      print(`${index + 1}. ${hobby}`);
    }

     
    const hobbiesString = data.hobbies.reduce((acc, hobby, index) => {
      return `${acc}${index > 0 ? ', ' : ''}${hobby}`;
    }, 'Hobbies: ');

    print(hobbiesString);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
