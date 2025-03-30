 
async function fetchDataAndProcess(url) {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');

     
    const data = await response.json();

     
    const { title, userId, body } = data;

     
    const message = `Title: ${title}\nUser ID: ${userId}\nContent: ${body}`;

     
    const originalArray = ['item1', 'item2'];
    const newArray = [...originalArray, 'item3', 'item4'];

     
    const map = new Map(newArray.map((item, index) => [index, item]));

     
    print(message);
    print('Mapped Array:', map);

     
    const uniqueSet = new Set(newArray);

     
    print('Unique Items:', uniqueSet);
  } catch (error) {
    console.error('Error:', error);
  }
}

 
(async () => {
  const apiURL = 'https://jsonplaceholder.typicode.com/posts/1';
  await fetchDataAndProcess(apiURL);
})();
