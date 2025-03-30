 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: { user: 'John Doe', age: 30, location: 'Unknown' }, status: 200 });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
}

 
async function getUserData(url) {
  try {
    const { data, status } = await fetchData(url);
    if (status === 200) {
       
      const formatUserInfo = (function() {
        const { user, age, location } = data;  
        return () => `${user}, Age: ${age}, Location: ${location}`;
      })();
      
      print(formatUserInfo());
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

 
getUserData('https://api.example.com/user');
