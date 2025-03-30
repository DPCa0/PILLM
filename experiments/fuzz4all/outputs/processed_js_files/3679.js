const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
};

const processData = (data) => {
    return data.map(item => ({
        ...item,
        fullName: `${item.firstName} ${item.lastName}`.toUpperCase(),
        isActive: item.age > 18
    }));
};

const displayData = (data) => {
    const fragment = document.createDocumentFragment();
    data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `Name: ${item.fullName} | Active: ${item.isActive}`;
        fragment.appendChild(div);
    });
    document.body.appendChild(fragment);
};

(async () => {
    try {
        const data = await fetchData('https://api.example.com/users');
        const processedData = processData(data);
        displayData(processedData);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();

 
if (!window.fetch) {
    window.fetch = async () => ({
        ok: true,
        json: async () => [
            { firstName: 'John', lastName: 'Doe', age: 25 },
            { firstName: 'Jane', lastName: 'Smith', age: 17 }
        ]
    });
}
