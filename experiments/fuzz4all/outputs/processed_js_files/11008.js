 
async function complexOperation(data) {
    try {
        const result = await new Promise((resolve, reject) => {
            setTimeout(() => {
                data && data.length > 0 ? resolve(data) : reject('No data provided');
            }, 1000);
        });

        const processedData = result.map(({ id, value }) => {
            const computedValue = value * 2;
            return { id, computedValue };
        });

        for (const { id, computedValue } of processedData) {
            print(`ID: ${id}, Computed Value: ${computedValue}`);
        }

        return `Processed ${processedData.length} items successfully.`;
    } catch (error) {
        console.error(`Error: ${error}`);
        return 'Operation failed.';
    }
}

const inputData = [
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
];

complexOperation(inputData).then((message) => print(message));
