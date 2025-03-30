(async function() {
     
    const fetchData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    };

     
    const processData = async () => {
        try {
            const data = await fetchData();
            const [first, second, ...rest] = data;
            print('First post:', first);
            print('Second post:', second);
            print('Rest of the posts:', rest.length);

            const mergedData = {...first, ...second};
            print('Merged data:', mergedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

     
    const manipulateData = async () => {
        const data = await fetchData();
        const titlesSet = new Set(data.map(({title}) => title));
        print('Unique titles:', titlesSet.size);

        const idSymbol = Symbol('id');
        const enrichedData = data.map(post => ({ ...post, [idSymbol]: post.id + 1000 }));
        print('Enriched Data with Symbol IDs:', enrichedData[0][idSymbol]);
    };

     
    await processData();
    await manipulateData();
})();
