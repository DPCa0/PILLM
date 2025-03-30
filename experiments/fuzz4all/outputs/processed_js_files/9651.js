 

 
export const fetchData = async () => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 28 },
        { id: 2, name: 'Bob', age: 34 },
        { id: 3, name: 'Charlie', age: 22 },
      ]);
    }, 1000);
  });
};

 
import { fetchData } from './data.js';

const processUser = ({ id, name, age }) => {
  print(`Processing user #${id}: ${name}, ${age} years old`);
};

const main = async () => {
  try {
    print("Fetching data...");
    const users = await fetchData();

    print("Data fetched. Processing users:");
    users.forEach(processUser);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();
