const fetchData = async (url) => {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Fetch Error:', error);
    }
};

const processData = (data) => {
    return data.map(({ id, name, email }) => ({
        id,
        fullName: name.toUpperCase(),
        emailDomain: email.split('@')[1],
    }));
};

const mergeData = (data1, data2) => {
    return [...new Map([...data1, ...data2].map(item => [item.id, item])).values()];
};

(async () => {
    const [data1, data2] = await Promise.all([
        fetchData('https://jsonplaceholder.typicode.com/users'),
        fetchData('https://jsonplaceholder.typicode.com/users?_start=5&_limit=5'),
    ]);

    const processedData1 = processData(data1);
    const processedData2 = processData(data2);

    const mergedData = mergeData(processedData1, processedData2);

    console.table(mergedData);

    const groupedByDomain = mergedData.reduce((acc, { emailDomain, ...rest }) => {
        acc[emailDomain] = acc[emailDomain] || [];
        acc[emailDomain].push(rest);
        return acc;
    }, {});

    print('Grouped by email domain:', groupedByDomain);
})();
