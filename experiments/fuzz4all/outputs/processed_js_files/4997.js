 
const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Alice', age: 30 },
                { id: 2, name: 'Bob', age: 25 },
                { id: 3, name: 'Carol', age: 35 }
            ]);
        }, 1000);
    });
};

 
(async () => {
    try {
        const data = await fetchData();
        
         
        const [, { name: secondPersonName }, ...rest] = data;
        
         
        const mappedData = new Map(
            rest.map(({ id, name, age }) => [id, `Name: ${name}, Age: ${age}`])
        );

         
        for (const [id, details] of mappedData) {
            print(`ID: ${id}, ${details}`);
        }

         
        const uniqueNames = Array.from(
            new Set(data.map(({ name }) => name))
        ).reduce((acc, name) => `${acc}, ${name}`);

        print(`Names in data: ${uniqueNames}`);
        print(`Second person's name is: ${secondPersonName}`);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
