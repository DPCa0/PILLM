 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const { userId, id, title, body } = data;
        console.log(`Post Info:
        User ID: ${userId}
        Post ID: ${id}
        Title: ${title}
        Body: ${body}`);
    } catch (error) {
        console.error(`Failed to fetch data: ${error.message}`);
    }
};

 
const performComplexOperation = async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    print('Starting complex operation...');

    await fetchData(url);

    const promise1 = new Promise((resolve) => setTimeout(() => resolve('Operation 1 complete'), 1000));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve('Operation 2 complete'), 2000));
    const promise3 = new Promise((resolve) => setTimeout(() => resolve('Operation 3 complete'), 3000));

    const results = await Promise.all([promise1, promise2, promise3]);
    results.forEach(result => print(result));

    print('Complex operation finished!');
};

performComplexOperation();
