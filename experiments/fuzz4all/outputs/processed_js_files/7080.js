 
const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
};

 
const processData = async () => {
    try {
         
        const [userData, postsData] = await Promise.all([
            fetchData('https://jsonplaceholder.typicode.com/users/1'),
            fetchData('https://jsonplaceholder.typicode.com/posts?userId=1')
        ]);

         
        const { name, email } = userData;
        const posts = postsData.map(({ title, ...rest }) => ({ title: title.toUpperCase(), ...rest }));

         
        const handler = {
            get: (target, property) => {
                print(`Accessed property: ${property}`);
                return target[property];
            }
        };
        const proxiedPosts = new Proxy(posts, handler);

         
        print(`User: ${name}, Email: ${email}`);
        print('Posts:', proxiedPosts);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

processData();
