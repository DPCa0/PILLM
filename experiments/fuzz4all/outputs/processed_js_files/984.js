 

 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                user: {
                    name: "Alice",
                    age: 30
                },
                stats: {
                    followers: 250,
                    views: 1800
                }
            });
        }, 1000);
    });
}

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function getUserData() {
    try {
        print("Fetching data...");
        const { user, stats } = await fetchData();
        await delay(500);
        print(`User: ${user.name}, Age: ${user.age}`);
        await delay(500);
        print(`Followers: ${stats.followers}, Views: ${stats.views}`);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

 
const user = {
    name: "Bob",
    age: 25
};

const handler = {
    get: function(target, property) {
        print(`Accessing property '${property}': ${target[property]}`);
        return target[property];
    },
    set: function(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

const proxyUser = new Proxy(user, handler);

proxyUser.name;  
proxyUser.age = 26;  

 
getUserData();
