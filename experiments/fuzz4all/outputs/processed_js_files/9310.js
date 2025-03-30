 

 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "validURL") {
                resolve({ data: { name: "John Doe", age: 30, job: "Developer" } });
            } else {
                reject("Invalid URL");
            }
        }, 1000);
    });
};

 
async function fetchUserData(url) {
    try {
        const { data } = await fetchData(url);  
        return data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}

 
function* userDataGenerator(data) {
    for (const key of Object.keys(data)) {
        yield [key, data[key]];
    }
}

 
(async function () {
    try {
        const userData = await fetchUserData("validURL");

         
        const generator = userDataGenerator(userData);
        for (const [key, value] of generator) {
            print(`${key}: ${value}`);
        }

         
        const newUser = { ...userData, location: "Unknown" };
        print(newUser);
    } catch (error) {
        console.error(error.message);
    }
})();
