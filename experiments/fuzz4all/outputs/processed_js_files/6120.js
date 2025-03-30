 
const fetchUserData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const processUserData = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users/1';
    const { name, email, address: { city } } = await fetchUserData(url) || {};

    return new Promise((resolve, reject) => {
        if (name && email && city) {
            resolve({ name, email, city });
        } else {
            reject('Incomplete user data');
        }
    });
};

const displayUserData = () => {
    processUserData()
        .then(({ name, email, city }) => {
            print(`Name: ${name}, Email: ${email}, City: ${city}`);
        })
        .catch(error => console.error('Processing error:', error));
};

 
displayUserData();
