 

const fetchData = async (url) => {
   
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok.');
  return response.json();
};

const processData = async () => {
  try {
     
    const [userData, postData] = await Promise.all([
      fetchData('https://jsonplaceholder.typicode.com/users/1'),
      fetchData('https://jsonplaceholder.typicode.com/posts/1'),
    ]);

     
    const { name, email } = userData;
    const { title, body } = postData;

     
    print(`User: ${name}, Email: ${email}`);
    print(`Post Title: ${title}, Post Body: ${body}`);

  } catch (error) {
     
    console.error('Error fetching data:', error);
  }
};

 
processData();
