 

 
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getData() {
  await delay(1000);  
  return { id: 1, name: 'Complex Item', details: { category: 'Advanced', type: 'Demo' } };
}

 
import { getData } from './utilities.js';

async function runProgram() {
  const { id, name, details: { category, type } } = await getData();
  print(`ID: ${id}, Name: ${name}, Category: ${category}, Type: ${type}`);

  const feature = await import('./feature.js');
  feature.showMessage('Data fetched successfully!');
}

runProgram().catch(console.error);

 
export function showMessage(message) {
  print(message);
}
