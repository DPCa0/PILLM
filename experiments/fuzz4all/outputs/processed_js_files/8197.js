const fetchUserData = async (userId) => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: 'John Doe', age: 30 });
        }, 1000);
    });
};

const processUserData = ({ name, age }) => {
     
    return `User ${name} is ${age} years old.`;
};

const logUserData = async (userId) => {
    try {
        const userData = await fetchUserData(userId);
        const message = processUserData(userData);
        print(message);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

 
const handler = {
    apply: (target, thisArg, args) => {
        print(`Called function with args: ${args}`);
        return target(...args);
    }
};

const proxiedLogUserData = new Proxy(logUserData, handler);

 
proxiedLogUserData(1);
