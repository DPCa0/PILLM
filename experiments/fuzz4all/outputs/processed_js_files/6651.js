 

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) resolve({ data: [1, 2, 3, 4, 5] });
      else reject('Error: No URL provided');
    }, 1000);
  });
};

 
const processData = async (url) => {
  try {
    const { data } = await fetchData(url);  
    const setData = new Set(data);  
    
     
    const processedData = [...setData].map((num) => num * 2);

     
    const mergedData = [...processedData, ...processedData];

     
    const logData = (first, second, ...rest) => {
      print(`First: ${first}, Second: ${second}, Rest: ${rest}`);
    };
    
    logData(...mergedData);  
  } catch (error) {
    console.error(`Caught Error: ${error}`);
  }
};

 
processData('https://api.example.com/data');
