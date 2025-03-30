 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000);
  });
};

 
const processData = async () => {
  try {
     
    const { data } = await fetchData();

     
    const [first, ...rest] = data;

     
    const uniqueData = [...new Set([first, ...rest, 2, 3])];

     
    const promises = uniqueData.map(async (num) => {
      return await new Promise((resolve) => {
        setTimeout(() => resolve(num * 2), 500);
      });
    });

     
    const results = await Promise.all(promises);

     
    print('Processed Results:', results);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
processData();
