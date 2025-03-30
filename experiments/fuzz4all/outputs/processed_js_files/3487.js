 

async function fetchData() {
     
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Alice', age: 25, hobby: 'Gardening' },
                { id: 2, name: 'Bob', age: 30, hobby: 'Reading' },
                { id: 3, name: 'Charlie', age: 35, hobby: 'Swimming' }
            ]);
        }, 1000);
    });
}

function* processData(data) {
     
    for (const { id, name, ...rest } of data) {
        if (rest.age > 26) yield { id, name, ...rest };
    }
}

(async function main() {
    try {
        const data = await fetchData();
        
        const results = Array.from(processData(data))
                             .map(({ name, hobby }) => ({
                                 introduction: `Hi, I'm ${name} and I love ${hobby}.`
                             }))
                             .filter(person => person.introduction.includes('Swimming'));

        print(results);
    } catch (error) {
        console.error('Error processing data:', error);
    }
})();
