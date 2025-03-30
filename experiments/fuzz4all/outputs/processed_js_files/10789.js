 

 
export const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
import { fetchData, delay } from './utils.js';

(async () => {
  try {
    const [userData, postData] = await Promise.all([
      fetchData('https://jsonplaceholder.typicode.com/users/1'),
      fetchData('https://jsonplaceholder.typicode.com/posts?userId=1'),
    ]);

    const { name, email } = userData;
    print(`User: ${name}, Email: ${email}`);

    const { title, body } = postData[0];
    print(`Post Title: ${title}`);
    print(`Post Body: ${body}`);

    await delay(1000);
    print('Data fetched and displayed successfully!');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
