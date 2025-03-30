 
import 'https://cdn.jsdelivr.net/npm/lodash-es/lodash.min.js';
import axios from 'https://cdn.skypack.dev/axios';
import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';

 
(async () => {
   
  const uniqueID = uuidv4();
  print(`Generated Unique ID: ${uniqueID}`);

   
  const data = [
    { user: 'Alice', age: 34, active: true },
    { user: 'Bob', age: 45, active: false },
    { user: 'Charlie', age: 29, active: true }
  ];
  
   
  const activeUsers = _.filter(data, 'active');
  print('Active Users:', activeUsers);

   
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;
    print('Fetched Posts:', posts.slice(0, 5));  
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

   
  const usersMap = new Map();
  activeUsers.forEach(user => usersMap.set(user.user, user.age));
  print('Users Map:', usersMap);

  const ageSet = new Set(data.map(user => user.age));
  print('Unique Ages:', [...ageSet]);

   
  const [firstPost, ...otherPosts] = posts;
  print('First Post:', firstPost);
  print('Other Posts:', otherPosts.slice(0, 2));  

   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  await delay(2000);
  print('This message is displayed after a 2 second delay');
})();
