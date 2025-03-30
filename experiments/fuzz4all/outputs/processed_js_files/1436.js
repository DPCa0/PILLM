class AsyncOperation {
    constructor(data) {
        this.data = data;
    }

    async processData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.map(item => item * 2));
            }, 1000);
        });
    }
}

const logResult = (prefix, data) => print(`${prefix}:`, data);

(async function main() {
    try {
        const data = [1, 2, 3, 4, 5];
        
        const operation = new AsyncOperation(data);
        const processedData = await operation.processData();
        
        logResult("Processed Data", processedData);
        
        const multipliedData = processedData.map(num => num ** 2);
        
        logResult("Squared Data", multipliedData);
        
        const sum = multipliedData.reduce((total, num) => total + num, 0);
        
        logResult("Sum of Squared Data", sum);
        
        const evenNumbers = multipliedData.filter(num => num % 2 === 0);
        
        logResult("Even Squared Data", evenNumbers);
        
        const result = multipliedData.find(num => num > 20);
        
        logResult("First Element Greater than 20", result);
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
