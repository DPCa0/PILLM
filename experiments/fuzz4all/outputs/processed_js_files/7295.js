 

function* numberGenerator() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function printNumbers() {
    const numGen = numberGenerator();
    for (let i = 0; i < 5; i++) {
        let { value } = numGen.next();
        print(`Generated number: ${value}`);
        await sleep(1000);
    }
    print('Completed number generation');
}

const fetchData = url => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            resolve({ data: { id: 1, name: 'Sample Data' }, status: 200 });
        } else {
            reject(new Error('Network Error'));
        }
    }, 1500);
});

async function getData() {
    try {
        const response = await fetchData('https://api.example.com/data');
        const { data: { id, name } } = response;
        print(`Fetched data - ID: ${id}, Name: ${name}`);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

(async function runProgram() {
    print('Starting Program');
    await Promise.all([printNumbers(), getData()]);
    print('Program Finished');
})();
