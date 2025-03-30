Certainly! Below is a JavaScript program that uses some advanced features such as Promises, async/await, closures, and higher-order functions:

 
const delayedOperation = (operation, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(operation());
        }, delay);
    });
};

 
const counter = (() => {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count
    };
})();

 
const executeTasks = async () => {
    print('Starting tasks...');
    
    const result1 = await delayedOperation(() => counter.increment(), 1000);
    print(`Counter after increment: ${result1}`);
    
    const result2 = await delayedOperation(() => counter.decrement(), 2000);
    print(`Counter after decrement: ${result2}`);
    
    const result3 = await delayedOperation(() => counter.increment(), 1500);
    print(`Counter after another increment: ${result3}`);
    
    print('All tasks completed!');
};

 
const array = [1, 2, 3, 4, 5];
const doubledArray = array.map(num => num * 2);

print(`Original array: [${array.join(', ')}]`);
print(`Doubled array: [${doubledArray.join(', ')}]`);

 
executeTasks();

This program combines several advanced JavaScript features to perform asynchronous tasks with delayed execution, manipulates a stateful closure, and demonstrates the use of higher-order functions for array transformations.