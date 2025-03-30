 

async function fetchData() {
     
    return new Promise((resolve) => {
        setTimeout(() => resolve({ user: { name: 'Alice', age: 25 }, scores: [80, 95, 88] }), 1000);
    });
}

function* calculateScores(scores) {
    let sum = 0;
    for (let score of scores) {
        sum += score;
        yield sum / scores.length;  
    }
}

async function main() {
    try {
        const { user: { name, age }, scores } = await fetchData();  
        print(`User: ${name}, Age: ${age}`);

        const scoresGenerator = calculateScores(scores);
        
        for (let average of scoresGenerator) {
            print(`Current Average: ${average.toFixed(2)}`);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();
