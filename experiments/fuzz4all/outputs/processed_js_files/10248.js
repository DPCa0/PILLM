class EnhancedArray extends Array {
    constructor(...args) {
        super(...args);
    }
    
    async mapAsync(callback) {
        return Promise.all(this.map(async (value, index, array) => {
            return callback(value, index, array);
        }));
    }

    unique() {
        return this.reduce((acc, value) => acc.includes(value) ? acc : [...acc, value], []);
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async function main() {
    const data = new EnhancedArray(1, 2, 3, 2, 4, 5, 3, 6, 7, 5);
    
    print('Original Array:', data);
    
    const processed = await data.mapAsync(async num => {
        await delay(100);
        return num * 2;
    });

    print('Processed Array:', processed);

    print('Unique Processed Array:', new EnhancedArray(...processed).unique());
})();
