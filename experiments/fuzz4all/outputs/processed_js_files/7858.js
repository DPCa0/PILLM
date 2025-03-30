 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
function* generateSquares() {
    let num = 1;
    while (true) {
        yield num * num;
        num++;
    }
}

 
async function processSquares() {
    const squares = generateSquares();

    for (let i = 0; i < 10; i++) {
        const nextSquare = squares.next().value;

         
        const { json } = await (async () => {
            const response = await fetch(`https: 
            return response;
        })();

         
        const data = await json();
        print(`Todo ${data?.id ?? 'Unknown'}: ${data?.title ?? 'No title available'}`);

         
        await delay(500);
    }
}

 
(async () => {
    try {
         
        await processSquares();
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
