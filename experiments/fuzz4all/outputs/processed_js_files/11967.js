 
const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

 
(async () => {
    try {
         
        const [post, user] = await Promise.all([
            fetchData('https://jsonplaceholder.typicode.com/posts/1'),
            fetchData('https://jsonplaceholder.typicode.com/users/1')
        ]);

         
        print(`Title: ${post?.title}\nAuthor: ${user?.name}`);

         
        const numbers = [1, 2, 3, 4, 5, 6];
        const sumOfOdds = numbers
            .filter(num => num % 2 !== 0)
            .map(num => num * num)
            .reduce((sum, num) => sum + num, 0);

        print(`Sum of squares of odd numbers: ${sumOfOdds}`);

         
        const uniqueNumbers = [...new Set([1, 2, 2, 3, 4, 4, 5])];
        print(`Unique numbers: ${uniqueNumbers.join(', ')}`);

         
        const dynamicProperty = 'dynamicKey';
        const obj = {
            staticKey: 'staticValue',
            [dynamicProperty]: 'dynamicValue'
        };
        print(`Object:`, obj);

    } catch (error) {
         
        console.error('Error fetching data:', error);
    }
})();
