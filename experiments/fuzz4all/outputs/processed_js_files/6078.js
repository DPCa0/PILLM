 
const fetchData = async () => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: [1, 2, 3, 4, 5] });
    }, 1000);
  });
};

 
function* dataProcessor(data) {
  for (const item of data) {
    yield item * 2;  
  }
}

 
const handler = {
  get: function(target, prop) {
    if (prop === 'doubleLength') {
      return target.length * 2;
    }
    return Reflect.get(...arguments);
  }
};

(async () => {
  try {
     
    const response = await fetchData();

     
    const proxiedData = new Proxy(response.data, handler);

    print("Original Data:", response.data);
    print("Proxied Data Double Length:", proxiedData.doubleLength);

     
    const processedData = dataProcessor(response.data);
    for (const value of processedData) {
      print("Processed Value:", value);
    }

     
    const transformedData = response.data.map((num) => num * 3);
    print("Transformed Data:", transformedData);

     
    const uniqueData = new Set(transformedData);
    print("Unique Data:", uniqueData);

  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
})();
