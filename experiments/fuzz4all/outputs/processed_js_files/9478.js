Certainly! Below is a JavaScript program that uses several advanced features, including Promises, async/await, destructuring, and the spread operator.

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchDataAndProcess() {
    try {
         
        print("Fetching data...");
        await delay(2000);  

         
        const data = [
            { id: 1, name: 'Alice', score: 85 },
            { id: 2, name: 'Bob', score: 92 },
            { id: 3, name: 'Charlie', score: 78 }
        ];

        print("Data fetched:", data);

         
        const processedData = data.map(({ id, name, ...rest }) => ({
            id,
            name: name.toUpperCase(),
            ...rest
        }));

        print("Processed Data:", processedData);

         
        await delay(1000);

         
        const totalScore = processedData.reduce((acc, { score }) => acc + score, 0);
        const averageScore = totalScore / processedData.length;
        
        print(`Average Score: ${averageScore.toFixed(2)}`);

    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}

 
fetchDataAndProcess();

This script simulates fetching and processing data using modern JavaScript features. It involves asynchronous operations with Promises and `async/await`, and employs destructuring and the spread operator to manipulate data in a concise manner.