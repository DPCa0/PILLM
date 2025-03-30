 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: "John Doe", age: 30, profession: "Developer" };
            resolve(data);
        }, 1000);
    });
};

async function processUserData() {
    try {
        const { name, age, profession } = await fetchData();
        print(`Name: ${name}, Age: ${age}, Profession: ${profession}`);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

processUserData();
