const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const processData = (data) => {
    const { users } = data;
    return users
        .filter(({ age }) => age > 18)
        .map(({ name, email }) => ({
            name: name.toUpperCase(),
            email,
            timestamp: new Date().toISOString()
        }));
};

const renderData = (data) => {
    const container = document.getElementById('user-list');
    data.forEach(({ name, email, timestamp }) => {
        const userElement = document.createElement('div');
        userElement.classList.add('user');
        userElement.innerHTML = `
            <h3>${name}</h3>
            <p>Email: ${email}</p>
            <p>Fetched at: ${timestamp}</p>
        `;
        container.appendChild(userElement);
    });
};

const init = async () => {
    try {
        const data = await fetchData('https://api.example.com/data');
        const processedData = processData(data);
        renderData(processedData);
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
};

 
if (module.hot) {
    module.hot.accept(async () => {
        document.getElementById('user-list').innerHTML = '';  
        await init();
    });
}

document.addEventListener('DOMContentLoaded', init);
