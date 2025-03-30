 

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve({ data: [1, 2, 3, 4, 5] });
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
};

 
function* generateSquares(numbers) {
    for (let number of numbers) {
        yield number ** 2;
    }
}

 
const main = async () => {
    try {
         
        const log = (strings, ...values) => print(`${strings[0]}${values.join(' ')}`);

        log`Fetching data...`;

        const url = 'https://api.example.com/data';
        const { data } = await fetchData(url);  

        log`Data fetched: ${JSON.stringify(data)}`;

        const squares = [...generateSquares(data)];  

        log`Squares: ${squares.join(', ')}`;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

 
main();
