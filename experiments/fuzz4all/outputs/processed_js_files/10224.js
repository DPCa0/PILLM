 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             
            resolve({ data: [1, 2, 3, 4, 5] });
        }, 1000);
    });
}

async function processNumbers(url) {
    try {
        const { data: numbers } = await fetchData(url);

         
        const uniqueNumbers = new Set(numbers.map(num => num * 2));

         
        const squaresMap = new Map();
        for (const num of uniqueNumbers) {
            squaresMap.set(num, num ** 2);
        }

        return squaresMap;
    } catch (error) {
        console.error("Error processing numbers:", error);
    }
}

(async () => {
    const squaresMap = await processNumbers('https://example.com/data');

     
    for (const [num, square] of squaresMap) {
        print(`Number: ${num}, Square: ${square}`);
    }
})();
