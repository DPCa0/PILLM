 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ id: 1, name: "Sample Data", details: { description: "An example" } });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
};

 
const processData = async () => {
  try {
    const url = "https://api.example.com/data";
    const { id, name, details: { description } } = await fetchData(url);  
    print(`Fetched Data - ID: ${id}, Name: ${name}, Description: ${description}`);

     
    const extendedData = { ...{ id, name, description }, status: "Processed" };
    print("Extended Data:", extendedData);

     
    const { status, ...originalData } = extendedData;
    print("Original Data:", originalData);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

 
processData();
