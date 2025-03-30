 

 
const fetchData = () => new Promise(resolve => 
    setTimeout(() => resolve([
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 }
    ]), 1000)
);

async function processUsers() {
    try {
        const data = await fetchData();

         
        const userSummaries = data.map(({ id, name, age }) => 
            `User ID: ${id}, Name: ${name}, Age: ${age}`
        );

         
        print(`User Summaries:\n${userSummaries.join('\n')}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

processUsers();
