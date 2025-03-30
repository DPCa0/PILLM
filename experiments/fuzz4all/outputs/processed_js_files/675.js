 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve({ data: 'Success! Data received.' });
            } else {
                reject('Failed to fetch data.');
            }
        }, 1000);
    });
};

 
(async function main() {
    try {
         
        const { v4: uuidv4 } = await import('https://jspm.dev/uuid');

         
        const map = new Map();
        const set = new Set();

        const dataPromises = Array.from({ length: 5 }, async (_, i) => {
            try {
                const result = await fetchData();
                map.set(uuidv4(), result.data);
                set.add(i);
                print(`Promise ${i} resolved:`, result);
            } catch (error) {
                console.error(`Promise ${i} rejected:`, error);
            }
        });

         
        await Promise.all(dataPromises);

         
        const resultArray = [...map.entries()];
        print('Final Results:', resultArray);
        print('Unique Set:', [...set]);

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
