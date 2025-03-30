 

 
export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

 
export const processData = (data) => {
    const { results } = data;
    return results.map(({ name, email }) => ({ name, email }));
};

 
import { fetchData } from './module.js';
import { processData } from './utility.js';

const displayData = async (url) => {
    const data = await fetchData(url);
    if (!data) return;
    const processed = processData(data);
    processed.forEach(({ name, email }) => {
        print(`Name: ${name}, Email: ${email}`);
    });
};

 
const API_URL = 'https://randomuser.me/api/?results=5';
displayData(API_URL);

