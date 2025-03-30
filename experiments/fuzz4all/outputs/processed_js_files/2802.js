 

 
function* generateNumbers() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

 
async function fetchData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id, data: `Data for id: ${id}` });
        }, 1000);
    });
}

 
async function processMultipleData(count) {
    const numbers = generateNumbers();
    const promises = [];

    for (let i = 0; i < count; i++) {
        const { value: id } = numbers.next();
        promises.push(fetchData(id));
    }

    try {
        const results = await Promise.all(promises);
        results.forEach(({ id, data }) => {
            print(`Processed ${data}`);
        });
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

 
processMultipleData(5);
