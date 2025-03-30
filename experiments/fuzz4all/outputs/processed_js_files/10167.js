 

async function fetchData(url) {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve({
                    status: 200,
                    data: {
                        user: { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
                        posts: [
                            { id: 101, title: 'JavaScript Async/Await', content: 'Understanding async/await in JS' },
                            { id: 102, title: 'Destructuring Assignment', content: 'Using destructuring to access data' }
                        ]
                    }
                });
            } else {
                reject({ status: 404, message: 'URL not found' });
            }
        }, 1000);
    });
}

async function displayUserData() {
    try {
        const response = await fetchData('https://example.com/api/user');
        const {
            data: {
                user: { name, email },
                posts
            }
        } = response;

        print(`User: ${name}, Email: ${email}`);
        posts.forEach(({ title, content }) => {
            print(`Post: ${title}\nContent: ${content}\n`);
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

displayUserData();
