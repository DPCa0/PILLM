 

 
function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Alice',
        age: 30,
        interests: ['JavaScript', 'Hiking', 'Chess']
      });
    }, 1000);
  });
}

 
import { format } from './formatter.js';

 
async function displayUserInfo() {
  try {
    const { name, age, interests } = await fetchUserData();
    print(formatUserInfo({ name, age, interests }));
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
}

 
function formatUserInfo({ name, age, interests }) {
  return `
    User Information:
    -----------------
    Name: ${name}
    Age: ${age}
    Interests: ${interests.join(', ')}
  `;
}

 
displayUserInfo();

 
 
 
 
 
