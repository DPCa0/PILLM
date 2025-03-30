 
function* fibonacci(n) {
    let [prev, current] = [0, 1];
    while (n-- > 0) {
        yield current;
        [prev, current] = [current, prev + current];
    }
}

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const processFibonacci = async (count) => {
    const fib = fibonacci(count);
    const fibNumbers = [...fib];
    const promises = fibNumbers.map(num =>
        fetchData(`https: 
    );
    const results = await Promise.all(promises);

    results.forEach((result, index) => {
        if (result instanceof Error) {
            console.error(`Error fetching data for Fibonacci #${fibNumbers[index]}: ${result.message}`);
        } else {
            print(`Post #${result.id}: ${result.title}`);
        }
    });
};

processFibonacci(10).catch(err => console.error(`Processing Error: ${err.message}`));
