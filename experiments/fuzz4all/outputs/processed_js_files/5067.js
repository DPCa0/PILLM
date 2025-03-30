 
async function fetchAndProcessData() {
    try {
         
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        let data = await response.json();
        
         
        let titles = data.map(({ userId, id, title }) => ({ userId, id, title }));

         
        let uniqueUserIds = [...new Set(titles.map(post => post.userId))];

         
        let groupedTitles = titles.reduce((acc, { userId, title }) => {
            (acc[userId] = acc[userId] || []).push(title);
            return acc;
        }, {});

         
        uniqueUserIds.forEach(userId => {
            print(`User ID ${userId}:`);
            groupedTitles[userId].forEach(title => print(`- ${title}`));
        });
    } catch (error) {
         
        console.error('Error fetching or processing data:', error);
    }
}

 
fetchAndProcessData();
