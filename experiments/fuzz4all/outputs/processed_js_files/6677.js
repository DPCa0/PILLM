 

 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { userId: 1, userName: 'JohnDoe' };
            resolve(data);
        }, 2000);
    });
}

 
async function getUserData() {
    try {
        const data = await fetchData();
        print('Data fetched:', data);
        processUserData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const handler = {
    get(target, property) {
        print(`Property '${property}' accessed with value: ${target[property]}`);
        return target[property];
    }
};

 
function processUserData(data) {
    const proxiedData = new Proxy(data, handler);
    print('Processing user ID:', proxiedData.userId);
    print('Processing user Name:', proxiedData.userName);
}

 
(async () => {
    print('Starting data fetch...');
    await getUserData();
    print('Data fetch complete.');
})();
