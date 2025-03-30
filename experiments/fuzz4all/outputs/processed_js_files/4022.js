 
const fetchData = async (urls) => {
    try {
         
        const promises = urls.map(url => fetch(url).then(response => response.json()));
        const results = await Promise.all(promises);

         
        const mergedResults = results.reduce((acc, { data, ...rest }) => {
            return { ...acc, ...rest, data: [...(acc.data || []), ...data] };
        }, {});

        print('Merged Data:', mergedResults);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
function* urlGenerator(base, paramsList) {
    for (const params of paramsList) {
        const queryString = new URLSearchParams(params).toString();
        yield `${base}?${queryString}`;
    }
}

 
const baseURL = 'https://api.example.com/data';
const queryParameters = [
    { type: 'user', id: 1 },
    { type: 'post', id: 5 },
    { type: 'comment', id: 9 }
];

 
const urls = [...urlGenerator(baseURL, queryParameters)];
fetchData(urls);
