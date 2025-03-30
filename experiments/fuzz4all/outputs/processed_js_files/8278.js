 

function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             
            const data = { name: "John Doe", age: 30, city: "New York" };
            Math.random() > 0.5 ? resolve(data) : reject("Failed to fetch data");
        }, 1000);
    });
}

async function processUserData(url) {
    try {
        const userData = await fetchData(url);
        const { name, age, city } = userData;  
        print(`User ${name} is ${age} years old and lives in ${city}.`);

         
        const userWithExtraInfo = { ...userData, occupation: "Software Engineer" };
        print(userWithExtraInfo);
    } catch (error) {
        console.error(error);
    }
}

 
const userHandler = {
    get: (target, property) => {
        print(`Getting property "${property}"`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property "${property}" to "${value}"`);
        target[property] = value;
        return true;
    }
};

const userProxy = new Proxy({ name: "Jane Doe", age: 25 }, userHandler);
userProxy.name = "Emily Clark";
print(userProxy.name);

processUserData("https://api.example.com/user");
