 

async function* fetchDataFromApis(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        yield response.json();
    }
}

async function processApiData(urls) {
    let results = [];
    for await (const data of fetchDataFromApis(urls)) {
        const { id, name, details: { age, location } } = data;
        results.push({ id, name, age, location });
    }
    return results;
}

function calculateAverageAge(data) {
    const totalAge = data.reduce((sum, { age }) => sum + age, 0);
    return totalAge / data.length;
}

(async () => {
    const urls = [
        'https://api.example.com/user/1',
        'https://api.example.com/user/2',
        'https://api.example.com/user/3'
    ];

    try {
        const userData = await processApiData(urls);
        print('Processed User Data:', userData);

        const averageAge = calculateAverageAge(userData);
        print('Average Age:', averageAge);

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
