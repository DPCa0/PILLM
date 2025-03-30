const asyncOperation = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 100);
            randomNumber > 50 ? resolve(randomNumber) : reject('Number is too low');
        }, 1000);
    });
};

const processNumber = async (num) => {
    return num * 2;
};

const performComplexOperation = async () => {
    try {
        const number = await asyncOperation();
        print(`Received number: ${number}`);
        const processedNumber = await processNumber(number);
        print(`Processed number: ${processedNumber}`);
        
        const mapAsync = new Map([
            ['first', 1],
            ['second', 2],
            ['third', 3]
        ]);

        const iterablePromises = [...mapAsync.values()].map(async value => {
            await new Promise(resolve => setTimeout(resolve, 200));
            return value * processedNumber;
        });

        const results = await Promise.all(iterablePromises);
        print('Map processed results:', results);
        
        const uniqueNumbers = new Set([processedNumber, ...results]);
        print('Unique processed numbers:', uniqueNumbers);

    } catch (error) {
        console.error('Error occurred:', error);
    }
};

performComplexOperation();
