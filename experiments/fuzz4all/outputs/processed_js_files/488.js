 

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "validUrl") {
        resolve({ data: { user: { name: "Alice", age: 30 }, location: "Wonderland" } });
      } else {
        reject("Invalid URL");
      }
    }, 1000);
  });
};

 
const getData = async (...urls) => {
  try {
     
    const results = await Promise.all(urls.map(url => fetchData(url)));
    
    results.forEach(({ data }) => {
       
      const { user: { name, age }, location } = data;
      print(`User: ${name}, Age: ${age}, Location: ${location}`);
    });
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

 
getData('validUrl', 'invalidUrl', 'validUrl');
