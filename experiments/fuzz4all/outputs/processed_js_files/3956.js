const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
};

const processData = async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        const titles = data.map(({ title }) => title).filter(title => title.length < 50);
        const titleLengths = new Map(titles.map(title => [title, title.length]));

        const result = [...titleLengths].reduce((acc, [title, length]) => {
            return `${acc}\nTitle: "${title}", Length: ${length}`;
        }, 'Processed Titles:');

        print(result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
const consoleHandler = {
    get: (target, prop) => (...args) => {
        if (prop === 'log') args[0] = `[LOG]: ${args[0]}`;
        else if (prop === 'error') args[0] = `[ERROR]: ${args[0]}`;
        Reflect.get(target, prop)(...args);
    }
};

window.console = new Proxy(console, consoleHandler);

processData();
