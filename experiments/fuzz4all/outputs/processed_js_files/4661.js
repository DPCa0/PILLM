 

class ApiSimulation {
    constructor() {
        this.data = {
            user1: { name: 'Alice', age: 30 },
            user2: { name: 'Bob', age: 25 }
        };
    }
    
    fetchUserData(userId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this.data[userId];
                if (user) {
                    resolve(user);
                } else {
                    reject('User not found');
                }
            }, 1000);
        });
    }
}

const userApi = new ApiSimulation();

const asyncHandler = async (userId) => {
    try {
        const user = await userApi.fetchUserData(userId);
        print(`User found: ${user.name}, Age: ${user.age}`);
    } catch (error) {
        console.error(error);
    }
};

 
const userProxy = new Proxy(userApi, {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return Reflect.get(target, prop, receiver);
        } else {
            console.warn(`Property ${prop} not found`);
        }
    }
});

 
const userSet = new Set(['user1', 'user2']);
const userDetailsMap = new Map([
    ['user1', 'Alice'],
    ['user2', 'Bob']
]);

userSet.forEach(async (userId) => {
    print(`Fetching details for: ${userDetailsMap.get(userId)}`);
    await asyncHandler(userId);
});

 
print(userProxy.data);

 
function bold(strings, ...values) {
    return strings.reduce((result, string, i) => `${result}${string}<b>${values[i] || ''}</b>`, '');
}

const name = 'Charlie';
print(bold`Welcome, ${name}, to the advanced JavaScript demo!`);
