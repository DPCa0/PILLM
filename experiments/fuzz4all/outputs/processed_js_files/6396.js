 

async function fetchUserData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

         
        const { name, email, ...otherDetails } = data;

         
        print('Name:', name);
        print('Email:', email);
        print('Other Details:', otherDetails);

        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function userDataProcessor(dataPromise) {
    return dataPromise
        .then(data => {
            if (data && data.id) {
                 
                const updatedData = { ...data, status: 'processed' };
                return updatedData;
            }
            throw new Error('Invalid data');
        })
        .catch(error => {
            console.error('Processing error:', error);
            return null;
        });
}

 
const userAPI = 'https://jsonplaceholder.typicode.com/users/1';

const userData = fetchUserData(userAPI);
userDataProcessor(userData).then(processedData => {
    if (processedData) {
        print('Processed User Data:', processedData);
    }
});
