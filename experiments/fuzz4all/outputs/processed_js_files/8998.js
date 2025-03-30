 
async function complexFeatureDemo() {
     
    const simulateAsyncOperation = () =>
        new Promise((resolve, reject) => {
            setTimeout(() => resolve("Async operation complete!"), 1000);
        });

    try {
         
        const asyncResult = await simulateAsyncOperation();
        print(asyncResult);

         
        const handler = {
            get: (target, property) => {
                print(`Accessing property ${property}`);
                return target[property];
            },
        };

        const proxiedArray = new Proxy([1, 2, 3, 4], handler);

         
        const modifiedArray = proxiedArray
            .filter(num => num % 2 === 0)
            .map(num => num * 2)
            .reduce((acc, num) => acc + num, 0);

        print(`Result of array operations: ${modifiedArray}`);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

complexFeatureDemo();
