const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
};

const processData = (data) => {
    return data.map(({ id, title, completed }) => ({ 
        id, 
        title: title.toUpperCase(), 
        completed: !completed 
    }));
};

const displayData = (data) => {
    data.forEach(({ id, title, completed }) => {
        print(`ID: ${id}, Title: ${title}, Completed: ${completed}`);
    });
};

const runApp = async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        const rawData = await fetchData(url);
        const processedData = processData(rawData);
        displayData(processedData);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

runApp();
