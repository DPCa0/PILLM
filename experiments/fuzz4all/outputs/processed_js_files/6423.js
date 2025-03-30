 
async function fetchData() {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ user: 'Alice', age: 30 });
        }, 1000);
    });
}

 
function processUserData(strings, user, age) {
    const capitalizedName = user.charAt(0).toUpperCase() + user.slice(1);
    return `${strings[0]}${capitalizedName}${strings[1]}${age}${strings[2]}`;
}

 
(async () => {
     
    const { user, age } = await fetchData();

     
    const _ = await import('https://cdn.jsdelivr.net/npm/lodash-es/lodash.min.js');

     
    const shuffledArray = _.shuffle([1, 2, 3, 4, 5]);

     
    const message = processUserData`Hello, ${user}. You are ${age} years old!`;

    print(message);   
    print(`Here's a shuffled array: [${shuffledArray.join(', ')}]`);
})();
