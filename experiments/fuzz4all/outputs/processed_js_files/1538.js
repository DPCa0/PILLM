 

 
async function fetchData() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    try {
        let response = await fetch(url);
        let data = await response.json();
        
         
        let posts = data.map(({ id, title, ...rest }) => ({ id, title, additional: rest }));

         
        let extendedPosts = posts.map(post => ({
            ...post,
            summary: post.title.substring(0, 15),
        }));

        print(extendedPosts);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
function demonstrateSetMapSymbol() {
    const set = new Set([1, 2, 3, 3, 4, 5]);
    print('Unique Set:', [...set]);

    const map = new Map();
    map.set('name', 'Alice');
    map.set('age', 30);
    print('Map Example:', map.get('name'));

    const uniqueKey = Symbol('unique');
    const obj = {
        [uniqueKey]: 'This is a unique symbol property',
    };
    print('Symbol Property:', obj[uniqueKey]);
}

function* generateSequence() {
    yield 'First';
    yield 'Second';
    yield* ['Third', 'Fourth'];  
    yield 'Fifth';
}

 
fetchData();
demonstrateSetMapSymbol();

 
const generator = generateSequence();
for (const value of generator) {
    print('Generator Value:', value);
}
