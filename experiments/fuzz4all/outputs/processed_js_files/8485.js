 

 
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const random = (max) => Math.floor(Math.random() * max);

 
import { delay, random } from './utility.js';

export async function fetchData(url) {
  await delay(random(2000));
  return fetch(url).then(response => response.json());
}

 
import { fetchData } from './fetchData.js';

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
];

async function loadAllData() {
  try {
    const results = await Promise.all(urls.map(url => fetchData(url)));
    results.forEach(({ id, title, ...rest }) => {
      print(`Post ID: ${id}, Title: ${title}, Extras:`, rest);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

loadAllData();
