 

 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ status: 200, data: { name: 'John Doe', age: 30, interests: ['coding', 'music'] } });
            } else {
                reject({ status: 404, message: 'Not Found' });
            }
        }, 1000);
    });
};

 
const getUserProfile = async (url) => {
    try {
        const { status, data } = await fetchData(url);  
        if (status === 200) {
            const { name, age, interests } = data;  
            print(`Name: ${name}, Age: ${age}`);
            print(`Interests: ${[...interests, 'travel'].join(', ')}`);  
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

 
getUserProfile('https://api.example.com/data');
