 

 
export const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

 
import { fetchData } from './module1.js';

const processUserData = async (userId) => {
  try {
    const [userData, postsData] = await Promise.all([
      fetchData(`https: 
      fetchData(`https: 
    ]);

    const { name, email } = userData;
    const postsTitles = postsData.map(post => post.title);

    print(`User: ${name}, Email: ${email}`);
    print('Posts:', postsTitles.join(', '));
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

 
import { processUserData } from './module2.js';

const run = async () => {
  print('Fetching user data...');
  await processUserData(1);
  print('Done!');
};

run();
