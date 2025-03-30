 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: { user: { id: 1, name: 'Alice' }, status: 'success' } });
        }, 1000);
    });
};

 
function* createDataGenerator() {
    yield fetchData();
    yield fetchData();
}

 
const processData = async () => {
    const generator = createDataGenerator();

    for (const request of generator) {
        try {
            const { data: { user, status } } = await request;

            if (status === 'success') {
                print(`User ID: ${user.id}, Name: ${user.name}`);
            } else {
                console.error('Failed to fetch data.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
};

 
const repeatOperation = (operation, times) => {
    return async () => {
        for (let i = 0; i < times; i++) {
            await operation();
        }
    };
};

 
repeatOperation(processData, 2)();
