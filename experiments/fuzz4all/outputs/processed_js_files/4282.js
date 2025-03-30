 
async function* dataStream() {
    const data = ["Hello", "world", "from", "async", "generators"];
    for (const item of data) {
         
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield item;
    }
}

 
async function processStream() {
    const stream = dataStream();
    const tasks = [];

    for await (const item of stream) {
        tasks.push(
            new Promise((resolve) => {
                print(`Processing: ${item}`);
                setTimeout(() => resolve(item.toUpperCase()), 500);  
            })
        );
    }

     
    const results = await Promise.all(tasks);
    print('Processed Results:', results);
}

 
const exampleData = {
    user: {
        name: "John Doe",
        preferences: {
            theme: null  
        }
    }
};

const userTheme = exampleData.user?.preferences?.theme ?? "default";
print("User Theme:", userTheme);

 
(async () => {
    await processStream();
})();
