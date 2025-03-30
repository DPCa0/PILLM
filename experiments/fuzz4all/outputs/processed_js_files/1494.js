 

 
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: "Advanced JavaScript Data" });
    }, 1000);
  });
}

 
const handler = {
  get: function(target, property, receiver) {
    if (property in target) {
      return target[property];
    } else {
      throw new Error(`Property ${property} doesn't exist`);
    }
  }
};

 
async function processData() {
  try {
    print("Fetching data...");
    let response = await fetchData();
     
    const proxyResponse = new Proxy(response, handler);

    print(proxyResponse.data);  

    print(proxyResponse.nonExistentProperty);  
  } catch (error) {
    console.error("Error:", error.message);
  }
}

processData();
