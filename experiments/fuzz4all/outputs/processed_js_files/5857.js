 
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { createInterface } from 'readline';

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function complexOperation() {
    print('Starting complex operation...');
    await delay(1000);
    print('Step 1: Data processed.');
    await delay(1000);
    print('Step 2: Operation in progress...');
    await delay(1000);
    print('Complex operation completed!');
}

 
const processArray = (arr, fn) => arr.map(fn);

 
const templateString = (name, task) => `Hello, ${name}. Your task for today is: ${task}`;

 
function* taskGenerator(tasks) {
    for (let task of tasks) {
        yield task;
    }
}

 
(async function main() {
    const tasks = ['Learn JavaScript', 'Write complex code', 'Test application'];

     
    const taskGen = taskGenerator(tasks);
    for (let task of taskGen) {
        print(templateString('Developer', task));
        await delay(500);
    }

     
    const numbers = [1, 2, 3, 4];
    const squaredNumbers = processArray(numbers, num => num ** 2);
    print('Squared Numbers:', squaredNumbers);

     
    await complexOperation();

     
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Server is running...');
    });

    server.listen(3000, () => {
        print('Server listening on port 3000');
        rl.question('Press ENTER to stop the server...', () => {
            server.close();
            rl.close();
        });
    });
})();
