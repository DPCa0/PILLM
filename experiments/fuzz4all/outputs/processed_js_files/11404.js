class DataLoader {
    constructor(url) {
        this.url = url;
    }
    
    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

class DataProcessor {
    static processData(data) {
        return data.map(item => ({
            ...item,
            timestamp: new Date(item.timestamp),
            processed: true
        }));
    }
}

(async () => {
    const url = 'https://api.example.com/data';
    const loader = new DataLoader(url);

    try {
        const rawData = await loader.fetchData();
        const processedData = DataProcessor.processData(rawData);

        const table = document.createElement('table');
        const headers = Object.keys(processedData[0]);

        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        processedData.forEach(item => {
            const row = document.createElement('tr');
            headers.forEach(header => {
                const cell = document.createElement('td');
                cell.textContent = item[header];
                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        document.body.appendChild(table);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
