 
import fetch from 'node-fetch';

 
async function fetchAndProcessData(url) {
    try {
         
        const response = await fetch(url);
         
        const data = await response.json();
        
         
        const { title, completed } = data;
        
         
        print(`Task: ${title} is ${completed ? 'completed' : 'not completed'}.`);
        
         
        if (completed) {
            const { default: sayCompleted } = await import('./sayCompleted.js');
            sayCompleted();
        }
        
    } catch (error) {
         
        console.error('Fetch error:', error?.message ?? 'Unknown error');
    }
}

 
fetchAndProcessData('https://jsonplaceholder.typicode.com/todos/1');

 
class Task {
    #title;
    #completed;

    constructor(title, completed) {
        this.#title = title;
        this.#completed = completed;
    }

     
    #getStatus() {
        return this.#completed ? 'completed' : 'not completed';
    }

     
    displayTask() {
        print(`Task: ${this.#title} is ${this.#getStatus()}.`);
    }
}

 
const task = new Task('Learn JavaScript', true);
task.displayTask();

Make sure to create a `sayCompleted.js` file with a default export function to test the dynamic import properly:

export default function sayCompleted() {
    print('Congratulations on completing the task!');
}
