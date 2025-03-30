 

 
const fetchData = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url === 'https://api.example.com/data') {
      resolve({ data: { user: { id: 1, name: 'Alice', age: 30 }, items: ['apple', 'banana'] } });
    } else {
      reject(new Error('Invalid URL'));
    }
  }, 1000);
});

(async () => {
  try {
    const url = 'https://api.example.com/data';

     
    const { data: { user: { name, age }, items: [firstItem, ...otherItems] } } = await fetchData(url);

     
    print(`User Name: ${name}, Age: ${age}`);
    print(`Items: First - ${firstItem}, Others - ${otherItems.join(', ')}`);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();
