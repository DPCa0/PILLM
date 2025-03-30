const fetch = require('node-fetch');

 
(async function processData() {
    try {
        const urls = [
            'https://jsonplaceholder.typicode.com/posts/1',
            'https://jsonplaceholder.typicode.com/users/1',
            'https://jsonplaceholder.typicode.com/todos/1'
        ];

        const [postResponse, userResponse, todoResponse] = await Promise.all(
            urls.map(url => fetch(url))
        );

        const [post, user, todo] = await Promise.all(
            [postResponse, userResponse, todoResponse].map(res => res.json())
        );

        const result = {
            postTitle: post.title,
            userName: user.name,
            todoTitle: todo.title
        };

        print(result);

         
        const handler = {
            get: (target, prop) => {
                print(`Accessing property '${prop}'`);
                return prop in target ? target[prop] : 'Property not found';
            }
        };

        const proxiedResult = new Proxy(result, handler);

        print(proxiedResult.postTitle);  
        print(proxiedResult.nonExistentProperty);  

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
