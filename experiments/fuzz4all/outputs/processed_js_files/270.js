 
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    return response.json();
};

function* generateRandomNumbers(limit) {
    for (let i = 0; i < limit; i++) {
        yield Math.floor(Math.random() * 100);
    }
}

(async () => {
    try {
        const [user, posts] = await Promise.all([
            fetchData('https://jsonplaceholder.typicode.com/users/1'),
            fetchData('https://jsonplaceholder.typicode.com/posts?userId=1')
        ]);

        const userInfo = {
            name: user.name,
            company: user.company.name,
            numOfPosts: posts.length,
        };

        print(`User Info: ${JSON.stringify(userInfo)}`);

        const randomNumbers = [...generateRandomNumbers(5)];
        print(`Random Numbers: ${randomNumbers.join(', ')}`);

        const { name, company, numOfPosts } = userInfo;
        print(`Destructured Info: ${name} works at ${company} and has written ${numOfPosts} posts.`);
    } catch (error) {
        console.error('Error:', error);
    }
})();
