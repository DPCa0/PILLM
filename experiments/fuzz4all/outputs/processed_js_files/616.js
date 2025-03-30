 

async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

async function processUserData(url) {
    const data = await fetchData(url);
    if (data) {
        const { name, username, email, address: { city }, phone, website } = data;
        console.log(`User Info:
        Name: ${name}
        Username: ${username}
        Email: ${email}
        City: ${city}
        Phone: ${phone}
        Website: ${website}`);
    }
}

const userApi = 'https://jsonplaceholder.typicode.com/users/1';

processUserData(userApi);
