 
const fetchData = async () => {
  try {
     
    const [data1, data2] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/users/1').then(res => res.json())
    ]);

     
    const { title, body } = data1;
    const { name, email } = data2;

     
    print(`Post Title: ${title}\nContent: ${body}\n\nAuthor: ${name}\nContact: ${email}`);
    
     
    const mergedData = { ...data1, ...data2 };
    print('Merged Data:', mergedData);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
(async () => {
  await fetchData();
})();
