 
(async () => {
    try {
        const { default: axios } = await import('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js');

        function* dataGenerator(url) {
            let currentPage = 1;
            while (true) {
                yield axios.get(`${url}?page=${currentPage++}`)
                    .then(response => response.data)
                    .catch(error => console.error(error));
            }
        }

        const fetchData = async (generator, maxPages = 5) => {
            const dataIterator = generator('https://jsonplaceholder.typicode.com/posts');
            const results = [];

            for (let i = 0; i < maxPages; i++) {
                let result = await dataIterator.next().value;
                if (result) {
                    results.push(...result);
                } else {
                    break;
                }
            }

            return results;
        };

        const data = await fetchData(dataGenerator);
        print(`Fetched ${data.length} entries`);

        const processEntries = (entries) => {
            return entries.reduce((map, entry) => {
                if (!map[entry.userId]) {
                    map[entry.userId] = [];
                }
                map[entry.userId].push(entry);
                return map;
            }, {});
        };

        const userEntries = processEntries(data);
        print('User Entries:', userEntries);

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
