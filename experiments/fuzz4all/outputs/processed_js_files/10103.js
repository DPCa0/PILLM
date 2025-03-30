 
import fetch from 'node-fetch';   
import fs from 'fs/promises';     

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchDataAndLog() {
  try {
    print("Fetching data...");

    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    print("Data fetched successfully, writing to file...");

     
    await fs.writeFile('posts.json', JSON.stringify(data, null, 2));

    print("Data written to file successfully.");

     
    await delay(2000);

    print("Reading from file...");

     
    const fileData = await fs.readFile('posts.json', 'utf8');
    const posts = JSON.parse(fileData);

     
    posts.slice(0, 5).forEach(({ id, title, body }) => {
      print(`Post ID: ${id}\nTitle: ${title}\nBody: ${body.slice(0, 50)}...\n`);
    });

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

 
fetchDataAndLog();
