 
async function fetchDataAndProcess(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

         
        const { title, body, userId } = data;
        
         
        const [userInfo, comments] = await Promise.all([
            fetch(`https: 
            fetch(`https: 
        ]);

         
        const filteredComments = comments.map(comment => ({
            id: comment.id,
            email: comment.email
        })).filter(comment => comment.id % 2 === 0);

         
        function highlight(strings, ...values) {
            return strings.reduce((result, str, i) => 
                `${result}${str}<strong>${values[i] || ''}</strong>`, '');
        }

        print(highlight`Title: ${title}`);
        print(highlight`Body: ${body}`);
        print(`User Info: ${JSON.stringify(userInfo)}`);
        print(`Filtered Comments: ${JSON.stringify(filteredComments)}`);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
(async function main() {
    const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';
    await fetchDataAndProcess(API_URL);
})();
