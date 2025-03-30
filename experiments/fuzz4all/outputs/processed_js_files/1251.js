 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const complexAsyncFunction = async () => {
     
    try {
        print('Starting complex async operations...');
        
         
        await delay(1000);
        print('1 second delay completed.');

         
        const complexObject = {
            name: 'Complex Object',
            numbers: [1, 2, 3, 4, 5],
            multiply(factor) {
                return this.numbers.map(num => num * factor);
            }
        };

         
        const { name, multiply } = complexObject;
        print(`Operating on: ${name}`);

         
        const numbersSum = complexObject.numbers.reduce((acc, num) => acc + num, 0);
        print(`Sum of numbers: ${numbersSum}`);

         
        const multipliedNumbers = multiply(2);
        print(`Numbers multiplied by 2: [${multipliedNumbers.join(', ')}]`);

         
        const numbersWithDuplicates = [...multipliedNumbers, 2, 4, 6];
        const uniqueNumbers = [...new Set(numbersWithDuplicates)];
        print(`Unique numbers: [${uniqueNumbers.join(', ')}]`);

         
        await delay(500);
        print('Finished all operations.');

    } catch (error) {
        console.error('An error occurred:', error);
    }
};

 
complexAsyncFunction();
