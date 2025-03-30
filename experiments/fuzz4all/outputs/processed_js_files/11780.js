 
(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const fetchData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    
    const processData = (data) => {
        const summary = data.reduce((acc, post) => {
            acc.totalPosts++;
            acc.totalChars += post.body.length;
            return acc;
        }, { totalPosts: 0, totalChars: 0 });
        
        print(`Total Posts: ${summary.totalPosts}`);
        print(`Total Characters: ${summary.totalChars}`);
    };

    const logProgress = (data) => {
        print(`Processed ${data.length} items`);
    };

    const main = async () => {
        print('Fetching data...');
        const data = await fetchData();
        if (data) {
            print('Processing data...');
            await delay(500);  
            processData(data);
            logProgress(data);
        }
    };

    main();
})();
