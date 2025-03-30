 
async function fetchDataAndProcess() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    
    try {
         
        const response = await fetch(url);
        const data = await response.json();

         
        const handler = {
            get: function(target, prop) {
                if (prop in target) {
                    return target[prop].toUpperCase();
                }
                return 'Property not found';
            }
        };
        
         
        const firstPost = new Proxy(data[0], handler);

         
        const titleTemplate = (strings, title) => `${strings[0]}${title}${strings[1]}`;
        print(titleTemplate`Title: ${firstPost.title}`);
        
         
        const postSummaries = data.map(post => ({
            title: post?.title ?? 'No Title',
            body: post?.body?.slice(0, 50) ?? 'No Body',
        }));

         
        const [firstSummary, secondSummary, ...rest] = postSummaries;

        print('First Summary:', firstSummary);
        print('Second Summary:', secondSummary);
        
         
        const wordCount = data.reduce((acc, { body }) => acc + (body?.split(' ').length || 0), 0);
        print('Total word count:', wordCount);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchDataAndProcess();
