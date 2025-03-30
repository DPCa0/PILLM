 

 
async function fetchData(url) {
  try {
     
    let response = await fetch(url);
    
     
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

     
    let data = await response.json();

     
    const { title, body, userId } = data[0];

    return { title, body, userId };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

 
async function processMultipleDataSources() {
  try {
    const api1 = fetchData('https://jsonplaceholder.typicode.com/posts');
    const api2 = fetchData('https://jsonplaceholder.typicode.com/comments');
    const api3 = fetchData('https://jsonplaceholder.typicode.com/users');

    const [data1, data2, data3] = await Promise.all([api1, api2, api3]);

     
    print(`Post Title: ${data1.title}\nUser ID: ${data1.userId}`);
    print(`Comment: ${data2.body}\nUser ID: ${data2.userId}`);
    print(`User Name: ${data3.title}\nUser ID: ${data3.userId}`);
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

 
processMultipleDataSources();
