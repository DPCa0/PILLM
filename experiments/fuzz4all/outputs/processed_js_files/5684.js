 
import { promises as fs } from 'fs';

 
async function processFile(filePath) {
    try {
         
        const data = await fs.readFile(filePath, 'utf-8');
        const json = JSON.parse(data);
        
         
        const result = json.reduce((acc, item) => {
            const tags = new Set(item.tags);
            tags.forEach(tag => {
                if (!acc.has(tag)) acc.set(tag, []);
                acc.get(tag).push(item.name);
            });
            return acc;
        }, new Map());

         
        for (const [tag, names] of result) {
            print(`Tag: ${tag}, Items: ${[...names].join(', ')}`);
        }
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

 
const uniqueID = Symbol('ID');

 
const user = {
    id: 1,
    name: 'Alice',
    profile: { age: 25 }
};

const userAge = user.profile?.age ?? 'Age not available';

print(`User Age: ${userAge}, Unique ID: ${uniqueID.toString()}`);

 
processFile('./data.json');

This code illustrates advanced JavaScript concepts such as module usage with `fs`, asynchronous programming using `async/await`, usage of `Map` and `Set`, destructuring, rest parameters, `Symbol`, optional chaining, and nullish coalescing.