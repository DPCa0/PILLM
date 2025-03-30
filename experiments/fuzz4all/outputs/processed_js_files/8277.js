 
import fs from 'fs/promises';

 
async function processFile() {
    try {
         
        let data = await fs.readFile('input.txt', 'utf8');

         
        let transformedData = data.split('').reverse().join('').toUpperCase();

         
        await fs.writeFile('output.txt', transformedData);

        print('File processed successfully');
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

 
function createObservableObject(obj) {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            print(`Getting ${String(prop)}`);
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
            print(`Setting ${String(prop)} to ${value}`);
            return Reflect.set(target, prop, value, receiver);
        }
    });
}

 
let user = createObservableObject({ name: 'Alice', age: 30 });
user.name = 'Bob';  
print(user.age);  

 
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
for (const value of generateSequence(1, 5)) {
    print(value);  
}

 
processFile();
