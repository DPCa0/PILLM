const fetchData = async (url) => {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const processUserData = async () => {
    try {
         
        const [user, posts] = await Promise.all([
            fetchData('https://jsonplaceholder.typicode.com/users/1'),
            fetchData('https://jsonplaceholder.typicode.com/posts?userId=1')
        ]);

         
        const { name, email } = user ?? {};
        const firstPostTitle = posts?.[0]?.title ?? 'No posts available';

         
        print(`User: ${name} (Email: ${email})`);
        print(`First post title: ${firstPostTitle}`);

    } catch (error) {
         
        console.error('Error fetching data:', error);
    }
};

const debounce = (func, delay) => {
     
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

 
const userHandler = {
    get(target, property) {
        print(`Getting property ${property}`);
        return Reflect.get(target, property);
    },
    set(target, property, value) {
        print(`Setting property ${property} to ${value}`);
        return Reflect.set(target, property, value);
    }
};

const user = new Proxy({ name: 'John Doe', age: 30 }, userHandler);

processUserData();
user.name = 'Jane Doe';   

const logInput = debounce((input) => print(`Input: ${input}`), 300);
logInput('Hello');   
