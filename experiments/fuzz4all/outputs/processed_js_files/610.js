 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockData = {
                user: {
                    name: 'Jane Doe',
                    age: 30,
                    location: 'Earth'
                },
                posts: [
                    { id: 1, title: 'Advanced JS Tricks', content: 'Lorem ipsum dolor sit amet.' },
                    { id: 2, title: 'Understanding Async/Await', content: 'Ut enim ad minim veniam.' }
                ]
            };
            if (url === 'https://api.example.com/data') {
                resolve(mockData);
            } else {
                reject(new Error('Invalid URL'));
            }
        }, 1000);
    });
}

async function getData() {
    try {
        const url = 'https://api.example.com/data';
        
         
        const data = await fetchData(url);

         
        const { user, posts } = data;
        const { name, location } = user;

        print(`User Name: ${name}, Location: ${location}`);
        print('Posts:');
        posts.forEach(({ id, title }) => {
            print(`${id}: ${title}`);
        });

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

 
(async () => {
    await getData();
})();
