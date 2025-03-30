 
async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

const handler = {
    get: (target, prop, receiver) => {
        if (prop in target) {
            print(`Accessed property: ${String(prop)}`);
            return Reflect.get(target, prop, receiver);
        }
        console.error(`Property ${String(prop)} does not exist.`);
        return undefined;
    }
};

const dataProxy = new Proxy({}, handler);

(async () => {
    const [users, posts] = await Promise.all([
        fetchData('https://jsonplaceholder.typicode.com/users'),
        fetchData('https://jsonplaceholder.typicode.com/posts')
    ]);

    const userSymbolMap = new Map(users.map(user => [Symbol(user.name), user]));
    userSymbolMap.forEach((userData, symbol) => dataProxy[symbol] = userData);

    const combinedData = users.map(user => ({
        ...user,
        posts: posts.filter(post => post.userId === user.id)
    }));

    console.log(
        combinedData.flatMap(user => 
            user.posts.map(post => ({ user: user.name, title: post.title }))
        )
    );

    const randomUserSymbol = [...userSymbolMap.keys()][Math.floor(Math.random() * userSymbolMap.size)];
    print(`Random user accessed: ${dataProxy[randomUserSymbol].name}`);

})();
