 

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { message: "Hello, world!", status: 200 };
      if (url) {
        resolve(data);
      } else {
        reject(new Error("URL not provided"));
      }
    }, 1000);
  });
};

 
const processResponse = ({ message, status }) => {
  return `Response Status: ${status}, Message: "${message}"`;
};

 
(async () => {
  try {
    const url = "https://example.com/api";
    const response = await fetchData(url);
    const result = processResponse(response);
    print(result);

     
    const deepObject = { level1: { level2: { value: "Nested Value" } } };
    print(deepObject.level1?.level2?.value ?? "Default Value");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();

 
const uniqueValues = (...arrays) => {
  const combined = arrays.flat();
  return [...new Set(combined)];
};

 
const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7, 8];
print(uniqueValues(array1, array2));  
