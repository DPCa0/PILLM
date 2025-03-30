 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({
          status: 200,
          json: () => Promise.resolve({ data: [1, 2, 3, 4, 5] })
        });
      } else {
        reject(new Error("Network error"));
      }
    }, 1000);
  });
}

 
async function getData() {
  try {
    const response = await fetchData("https://api.example.com/data");

     
    const { status, json } = response;

    if (status === 200) {
      const { data } = await json();

       
      const squaredData = data.map(num => num ** 2);

      print("Squared Data:", squaredData);
      
       
      print("Spread Operator Data:", ...squaredData);

       
      const uniqueData = [...new Set(squaredData)];

      print("Unique Data:", uniqueData);

       
      print("Length of Data:", squaredData?.length ?? 0);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

getData();
