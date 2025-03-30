const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const processData = (data) => {
     
    const { users, ...rest } = data;
    const transformedUsers = users.map(({ id, name, email, ...info }) => ({
        id,
        name: name.toUpperCase(),
        email,
        info: { ...info, active: true }
    }));
    return { ...rest, users: transformedUsers };
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const updateDOM = ({ users }) => {
    const container = document.getElementById('user-container');
    container.innerHTML = users.map(user => `<div>${user.name} (${user.email})</div>`).join('');
};

const getUserData = debounce(async () => {
    const apiData = await fetchData('https://jsonplaceholder.typicode.com/users');
    if (apiData) {
        const processedData = processData({ users: apiData });
        updateDOM(processedData);
    }
}, 300);

document.getElementById('fetch-button').addEventListener('click', getUserData);
