 
import fs from 'fs/promises';

 
const performAsyncOperations = async () => {
  try {
     
    const [fileData, networkData] = await Promise.all([
      fs.readFile('data.json', 'utf8'),  
      fetchDataFromNetwork(),  
    ]);

     
    const combinedData = { ...JSON.parse(fileData), ...networkData };

    print('Combined Data:', combinedData);
  } catch (error) {
    console.error('Error:', error);
  }
};

 
const fetchDataFromNetwork = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ networkKey: 'networkValue' });
    }, 1000);
  });

 
(async () => {
  await performAsyncOperations();
})();
