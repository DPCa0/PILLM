 
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

 
const handler = {
    get: (target, property) => {
        print(`Getting property '${property}'`);
        return property in target ? target[property] : 42;
    },
    set: (target, property, value) => {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
    }
};

 
const obj = new Proxy({}, handler);
obj.name = "JavaScript";
print(obj.name);
print(obj.age);

 
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
const displayNumbers = (...nums) => {
    return `Numbers: ${nums.map(num => `(${num})`).join(', ')}`;
};

 
(async () => {
     
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const post = await fetchData(url);
    print(`Fetched post title: ${post.title}`);

     
    const nums = [...range(1, 5)];
    print(displayNumbers(...nums));
})();
