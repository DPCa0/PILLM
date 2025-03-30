 
const fetchData = async (url) => {
    try {
         
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

         
        const data = await response.json();

         
        const { title, body } = data;

         
        print(`Title: ${title}\nBody: ${body}`);

         
        const updatedData = { ...data, timestamp: new Date() };

         
        print(formatOutput`Updated Data: ${updatedData}`);

    } catch (error) {
         
        console.error(`Fetch Error: ${error?.message ?? 'Unknown Error'}`);
    }
};

 
function formatOutput(strings, data) {
    return strings.raw[0] + JSON.stringify(data, null, 2);
}

 
const addNumbers = (multiplier = 1, ...numbers) => numbers.reduce((sum, n) => sum + n, 0) * multiplier;

 
const userMap = new Map([
    [1, { name: 'Alice', age: 28 }],
    [2, { name: 'Bob', age: 34 }],
]);

 
for (const [id, { name, age }] of Array.from(userMap.entries())) {
    print(`User ${id}: Name - ${name}, Age - ${age}`);
}

 
fetchData('https://jsonplaceholder.typicode.com/posts/1')
    .then(() => console.log('Data fetched successfully'))
    .catch(error => console.error('An error occurred during fetching'));

 
print(`Sum multiplied: ${addNumbers(2, 1, 2, 3, 4)}`);   
