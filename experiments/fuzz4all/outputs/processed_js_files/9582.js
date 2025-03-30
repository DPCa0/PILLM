 
 

const fetchData = async (url) => {
   
  const fakeFetch = (url) => 
    new Promise((resolve, reject) => {
      setTimeout(() => {
        url === "https://api.example.com/data"
          ? resolve({ success: true, data: { id: 1, name: "John Doe", age: 30 } })
          : reject({ success: false, message: "Invalid URL" });
      }, 1000);
    });

  try {
    const { success, data } = await fakeFetch(url);
    if (success) {
       
      const { id, name, age } = data;
      print(`Fetched Data: ID=${id}, Name=${name}, Age=${age}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

 
(async () => {
  const url = "https://api.example.com/data";
  print(`Fetching data from ${url}`);
  await fetchData(url);
})();
