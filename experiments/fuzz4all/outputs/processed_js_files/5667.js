 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ data: { user: { name: 'John Doe', age: 30, skills: ['JavaScript', 'React'] } } });
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
}

 
async function processData(url) {
    try {
        const response = await fetchData(url);
        const { data: { user: { name, age, skills } } } = response;

         
        const skillMessage = skills.map(skill => `Skilled in ${skill}`).join(', ');

        return `${name} is ${age} years old. ${skillMessage}.`;
    } catch (error) {
        throw new Error(`Data processing failed: ${error}`);
    }
}

 
(async () => {
    try {
        const result = await processData('https://api.example.com/data');
        print(result);
    } catch (error) {
        console.error(error.message);
    }
})();
