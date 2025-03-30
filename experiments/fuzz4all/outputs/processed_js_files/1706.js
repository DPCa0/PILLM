 
const fetchData = async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    
     
    const [firstPost] = data;
    const { userId, id, title, body } = firstPost;
    
     
    const formatOutput = (strings, ...values) => 
      strings.reduce((acc, str, i) => `${acc}${str}<strong>${values[i] || ''}</strong>`, '');

     
    print(formatOutput`User ID: ${userId}, Post ID: ${id}, Title: ${title}, Body: ${body}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
(async () => await fetchData())();
