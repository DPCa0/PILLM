 
async function fetchUserData(userId) {
    try {
         
        const response = await fetch(`https: 
        
         
        const userData = await response.json();
        const companyName = userData?.company?.name || 'Unknown Company';

        print(`User Name: ${userData.name}, Company: ${companyName}`);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

 
function* userIdGenerator(maxId) {
    for (let id = 1; id <= maxId; id++) {
        yield id;
    }
}

 
const fetchedUserIds = new Set();
const userIdGen = userIdGenerator(5);

for (let id of userIdGen) {
    if (!fetchedUserIds.has(id)) {
        fetchUserData(id).then(() => {
            fetchedUserIds.add(id);
            print(`Fetched User IDs: ${[...fetchedUserIds].join(', ')}`);
        });
    }
}

 
const userOperationsLogger = {
    get(target, prop) {
        print(`Getting property ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const user = new Proxy({}, userOperationsLogger);
user.name = 'Jane Doe';
print(user.name);
