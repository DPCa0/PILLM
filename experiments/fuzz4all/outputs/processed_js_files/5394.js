 
const asyncOperation = (duration) => new Promise((resolve) => setTimeout(() => resolve(`Resolved after ${duration}ms`), duration));

 
async function executeTasks() {
    try {
         
        const [result1, result2] = await Promise.all([
            asyncOperation(1000),
            asyncOperation(2000)
        ]);

        print(result1);  
        print(result2);  

         
        const values = [1, 2, 3, 4, 5];
        const sum = values.reduce((acc, val) => acc + val, 0);
        const newValues = [...values, sum];

        print(`Values: ${values}, Sum: ${sum}, New Values: ${newValues}`);

         
        print(`Async operations completed and array processed with sum: ${sum}`);

         
        const dataMap = new Map();
        dataMap.set('result1', result1);
        dataMap.set('result2', result2);

        print(`Data Map: ${Array.from(dataMap.entries()).map(([key, value]) => `${key}: ${value}`).join(', ')}`);

         
        const uniqueKey = Symbol('unique');
        const myObject = {
            [uniqueKey]: 'This is a unique value',
            normalKey: 'This is a normal value'
        };
        
        print(`Object with unique Symbol key: ${myObject[uniqueKey]}, normal key: ${myObject.normalKey}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

executeTasks();
