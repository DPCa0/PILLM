 
async function fetchData(url) {
    try {
         
        const response = await fetch(url);
        const data = await response.json();

         
        const { title, userId, body } = data;

         
        print(formatData`Title: ${title}\nUser ID: ${userId}\nBody: ${body}`);

    } catch (error) {
         
        console.error('Failed to fetch data:', error?.message ?? 'Unknown error');
    }
}

 
function formatData(strings, ...values) {
    return strings.reduce((result, str, i) => result + str + (values[i] ? `**${values[i]}**` : ''), '');
}

 
(async () => {
    if (Math.random() > 0.5) {
        const { default: _ } = await import('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.default.js');
        print(_.join(['Dynamically', 'imported', 'lodash!'], ' '));
    }
})();

 
let config = null;
print(config?.timeout ?? 'Default Timeout');

 
(() => {
    print('IIFE executed!');
})();

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');
