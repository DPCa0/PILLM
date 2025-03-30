Certainly! Here's a JavaScript program that utilizes some advanced features, such as async/await, Promises, destructuring, spread/rest operators, and arrow functions:

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             
            const data = { name: "Sample Data", id: 1, values: [10, 20, 30] };
            url ? resolve(data) : reject("Invalid URL");
        }, 1000);
    });
};

 
const processData = async (url) => {
    try {
         
        const { name, id, values } = await fetchData(url);

         
        const modifiedValues = [...values, 40];

         
        print(`Fetched ${name} (ID: ${id}) with values: ${modifiedValues}`);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
};

 
processData("https://api.example.com/data");

 
(async () => {
    const additionalProcessing = (a, b, ...rest) => {
        const total = a + b + rest.reduce((acc, val) => acc + val, 0);
        print(`Total calculated using rest parameters: ${total}`);
    };

    additionalProcessing(5, 10, ...[15, 20, 25]);  
})();

This code demonstrates various advanced JavaScript features, such as async/await for handling asynchronous operations, destructuring for extracting data from objects, and using the spread/rest operators in different contexts.