const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const processData = (data) => {
    return data.reduce((acc, item) => {
        const { category, value } = item;
        acc[category] = (acc[category] || 0) + value;
        return acc;
    }, {});
};

const renderChart = async (data) => {
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'Category Values',
                data: Object.values(data),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
};

(async () => {
    try {
        const url = 'https://api.example.com/data';
        const data = await fetchData(url);
        const processedData = processData(data);
        await renderChart(processedData);
    } catch (error) {
        console.error('Error:', error);
    }
})();
