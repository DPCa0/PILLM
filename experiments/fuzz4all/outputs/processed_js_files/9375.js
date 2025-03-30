 

const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Alice', age: 28 },
                { id: 2, name: 'Bob', age: 34 },
                { id: 3, name: 'Carol', age: 45 }
            ]);
        }, 1000);
    });
};

(async () => {
    try {
        const data = await fetchData();

        const [{ name: firstName }, ...others] = data;
        
        const averageAge = data.reduce((sum, { age }) => sum + age, 0) / data.length;

        const message = `Hello ${firstName} and team! Average age is ${averageAge}.`;

        print(message);

        print('Details of others:');
        others.forEach(({ name, age }) => print(`Name: ${name}, Age: ${age}`));

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
