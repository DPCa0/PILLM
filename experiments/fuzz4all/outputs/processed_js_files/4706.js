class EnhancedArray extends Array {
    async mapAsync(callback) {
        return Promise.all(this.map(callback));
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const processData = async () => {
    try {
        const data = new EnhancedArray(1, 2, 3, 4, 5);
        const results = await data.mapAsync(async (num) => {
            await delay(1000);  
            return num * 2;
        });
        
        const filteredResults = results.filter(num => num > 5);
        print(`Filtered Results: ${filteredResults}`);

        const sum = filteredResults.reduce((acc, num) => acc + num, 0);
        print(`Sum of Filtered Results: ${sum}`);

        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
        print(`Formatted Sum: ${formatter.format(sum)}`);
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
};

processData();
