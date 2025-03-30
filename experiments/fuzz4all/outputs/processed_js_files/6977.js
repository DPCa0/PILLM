 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Alice', age: 30 },
                { id: 2, name: 'Bob', age: 25 },
                { id: 3, name: 'Charlie', age: 35 }
            ]);
        }, 1000);
    });
};

const processData = async () => {
    try {
        const data = await fetchData();
        const results = data.map(({ id, name, age }) => {
            const info = `ID: ${id}, Name: ${name}, Age: ${age}`;
            return { id, info };
        });

        results.forEach(({ info }) => print(info));

        const sumOfAges = data.reduce((sum, { age }) => sum + age, 0);
        print(`Average Age: ${(sumOfAges / data.length).toFixed(2)}`);
    } catch (error) {
        console.error(`Error processing data: ${error.message}`);
    }
};

processData();
