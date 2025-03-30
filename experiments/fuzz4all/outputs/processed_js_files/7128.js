 

const apiProxyHandler = {
    get: function(target, propKey) {
        if (propKey in target) return target[propKey];

         
        return async function() {
            const endpoint = `${target.baseUrl}/${propKey}`;
            try {
                const response = await fetch(endpoint);
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(`Failed to fetch from ${endpoint}:`, error);
            }
        };
    }
};

const api = new Proxy({
    baseUrl: 'https://jsonplaceholder.typicode.com'
}, apiProxyHandler);

async function main() {
    try {
         
        const user = await api.users();
        print('User:', user[0]);  

        const post = await api.posts();
        print('Post:', post[0]);  

        const comments = await api.comments();
        print('Comments:', comments.slice(0, 2));  

    } catch (error) {
        console.error('Error occurred in main function:', error);
    }
}

main();
