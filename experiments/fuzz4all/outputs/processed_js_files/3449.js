const crypto = require('crypto');

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000);
    });
};

 
const processData = (data, fn) => data.map(fn);

 
const incrementer = (increment) => (num) => num + increment;

 
function* squareGenerator(numbers) {
    for (let num of numbers) {
        yield num ** 2;
    }
}

 
(async () => {
    try {
        const result = await fetchData();  
        const increment = incrementer(5);  

         
        const incrementedData = processData(result.data, increment);

         
        const squares = [...squareGenerator(incrementedData)];

         
        const hash = crypto.createHash('sha256');
        hash.update(JSON.stringify(squares));

        print('Original Data:', result.data);
        print('Incremented Data:', incrementedData);
        print('Squared Data:', squares);
        print('SHA256 Hash of Squares:', hash.digest('hex'));
    } catch (error) {
        console.error('Error:', error);
    }
})();
