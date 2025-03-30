 
async function fetchData(url) {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = [
                { id: 1, name: 'Alice', age: 30 },
                { id: 2, name: 'Bob', age: 25 },
                { id: 3, name: 'Charlie', age: 35 }
            ];
            Math.random() > 0.1 ? resolve(data) : reject('Error fetching data');
        }, 1000);
    });
}

(async () => {
    try {
        const data = await fetchData('https://example.com/api');
        const userMap = new Map();
        
         
        data.forEach(({ id, name, age }) => {
            userMap.set(id, { name, age });
        });

         
        for (const [id, { name, age }] of userMap) {
            print(`User ID: ${id}, Name: ${name}, Age: ${age}`);
        }

         
        const uniqueAges = new Set(data.map(({ age }) => age));
        print('Unique Ages:', [...uniqueAges]);

    } catch (error) {
        console.error(error);
    }
})();
