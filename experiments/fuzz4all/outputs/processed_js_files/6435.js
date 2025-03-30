 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

 
async function processData() {
    try {
         
        const [, , third, ...rest] = [...fibonacci()].slice(0, 10);

        print(`The third Fibonacci number is: ${third}`);
        print(`The rest are: ${rest}`);

        await delay(2000);  

         
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Network response was not ok');

        let data = await response.json();

         
        let [first, second, ...others] = data;

        print('First post:', first);
        print('Second post:', second);
        print('Total number of other posts:', others.length);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

 
(async () => {
    print('Processing data...');
    await processData();
})();
