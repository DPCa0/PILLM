 
async function complexOperation() {
    const fetchData = () => new Promise((resolve, reject) => {
        setTimeout(() => resolve({ user: 'Alice', balance: 250 }), 1000);
    });

    const processData = (data) => new Promise((resolve, reject) => {
        setTimeout(() => {
            const { user, balance } = data;
            const updatedBalance = balance * 1.1;
            resolve({ user, updatedBalance });
        }, 1000);
    });

    try {
        const data = await fetchData();
        print(`Fetched Data: ${JSON.stringify(data)}`);
        
        const updatedData = await processData(data);
        const { user, updatedBalance } = updatedData;
        print(`Processed Data: User: ${user}, Updated Balance: ${updatedBalance}`);
        
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

complexOperation();
