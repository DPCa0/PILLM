 

const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({
                    user: { name: 'Alice', age: 30 },
                    hobbies: ['reading', 'cycling', 'hiking']
                });
            } else {
                reject('URL not found');
            }
        }, 2000);
    });
};

(async function main() {
    try {
        const url = 'https://api.example.com/data';
        const { user: { name, age }, hobbies } = await fetchData(url);
        const hobbiesList = hobbies.map(hobby => `<li>${hobby}</li>`).join('');
        console.log(`User Info:
        Name: ${name}
        Age: ${age}
        Hobbies:
        <ul>${hobbiesList}</ul>`);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
})();
