 

 
async function fetchData() {
  const url = "https://jsonplaceholder.typicode.com/posts/1";

   
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

 
function processData(callback) {
  fetchData()
    .then(data => {
      const { id, title, body } = data;  
      
       
      const processed = `Post #${id}\nTitle: ${title}\nContent: ${body}`;
      
      callback(null, processed);
    })
    .catch(err => callback(err, null));
}

 
const logData = (error, data) => {
  if (error) {
    console.error('Error fetching data:', error);
  } else {
    print('Processed Data:\n', data);
  }
};

 
(async () => {
   
  processData(logData);
})();
