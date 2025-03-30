const complexOperation = async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const fetchData = async url => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    };

    const processData = async () => {
        try {
            await delay(1000);  
            const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
            const processedData = data.reduce((acc, { userId, title }) => {
                if (!acc[userId]) acc[userId] = [];
                acc[userId].push(title);
                return acc;
            }, {});
            return processedData;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const displayData = data => {
        for (const [userId, titles] of Object.entries(data)) {
            print(`User ${userId} has posts:`);
            titles.forEach(title => print(`- ${title}`));
        }
    };

    const data = await processData();
    if (data) displayData(data);
};

complexOperation();
