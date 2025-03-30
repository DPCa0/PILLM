 
const data = {
    name: "Advanced JS Object",
    info: {
        tags: ["JavaScript", "Programming", "Advanced"],
        versions: [ES5, ES6, ES7, ES8, ES9].map((v, i) => ({ version: v, year: 2009 + i })),
    },
    getVersionByYear(year) {
        return this.info.versions.find(v => v.year === year)?.version || "Version not found";
    },
    async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Network response was not ok");
            const jsonData = await response.json();
            print("Fetched Data:", jsonData);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }
};

 
const {
    name,
    info: { tags, versions }
} = data;

print("Name:", name);
print("Tags:", tags.join(", "));
print("Latest JS Version:", versions.at(-1));

 
(async () => {
    const { format } = await import('date-fns');
    const now = new Date();
    print("Current Date:", format(now, 'yyyy-MM-dd HH:mm:ss'));
})();

 
const handler = {
    get: (target, prop) => {
        return prop in target ? target[prop] : `Property "${prop}" does not exist on the target object`;
    }
};

const proxiedData = new Proxy(data, handler);

print(proxiedData.name);  
print(proxiedData.nonExistent);  

 
function* customIterator(arr) {
    for (let item of arr) {
        yield item;
    }
}

const iterator = customIterator(tags);
let next = iterator.next();
while (!next.done) {
    print("Tag from Iterator:", next.value);
    next = iterator.next();
}

 
data.fetchData('https://jsonplaceholder.typicode.com/todos/1');
