 

async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = [
                { name: "Alice", age: 25 },
                { name: "Bob", age: 30 },
                { name: "Charlie", age: 35 }
            ];
            resolve(data);
        }, 1000);
    });
}

async function processData() {
    try {
         
        const data = await fetchData("https://example.com/api/data");

         
        const transformedData = data.map(({ name, age }) => {
            return { name, isAdult: age >= 30 };
        });

         
        const adults = transformedData.filter(person => person.isAdult);

         
        adults.forEach(({ name }) => {
            print(`Welcome, ${name}!`);
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

processData();
