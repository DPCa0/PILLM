Certainly! Here's a JavaScript program that uses advanced features such as Promises, async/await, destructuring, and the Spread/Rest operator.

// Advanced JavaScript: Fetch, Async/Await, and Spread/Rest Operator

// Mock asynchronous function using Promise
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (url === 'https: 
            resolve({ id: 1, name: 'John Doe', age: 30 });
        } else {
            reject(new Error('Invalid URL'));
        }
    }, 1000);
});

 
async function processData(url) {
    try {
        const { id, ...rest } = await fetchData(url);  
        print(`ID: ${id}, Details:`, rest);
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

 
const originalData = { name: 'Jane Doe', occupation: 'Engineer' };
const additionalData = { age: 28, location: 'New York' };
const mergedData = { ...originalData, ...additionalData };  

print('Original Data:', originalData);
print('Merged Data:', mergedData);

 
processData('https://api.example.com/data');
processData('https://api.invalidurl.com/error');

This code demonstrates asynchronous operations with Promises and async/await, object destructuring with the Rest operator, and object cloning/merging with the Spread operator.