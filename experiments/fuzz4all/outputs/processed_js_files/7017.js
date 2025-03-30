 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: { user: 'John Doe', age: 30 } });
            } else {
                reject("URL not found");
            }
        }, 1000);
    });
}

 
async function getUserData() {
    try {
        const response = await fetchData("https://api.example.com/data");
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
const userValidationHandler = {
    set(target, key, value) {
        if (key === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        target.set(key, value);
        return true;
    }
};

async function run() {
    const userData = await getUserData();

    const userMap = new Map();
    const validatedUserMap = new Proxy(userMap, userValidationHandler);

     
    for (const [key, value] of Object.entries(userData)) {
        validatedUserMap[key] = value;
    }

     
    try {
        validatedUserMap.age = 'thirty';  
    } catch (e) {
        console.error(e);
    }

     
    print(Object.fromEntries(validatedUserMap));
}

run();
