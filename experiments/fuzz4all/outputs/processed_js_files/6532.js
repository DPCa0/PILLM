 
(async function fetchDataAndProcess() {
    try {
        const fetchJson = url => fetch(url).then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        });

         
        const [data1, data2] = await Promise.all([
            fetchJson('https://jsonplaceholder.typicode.com/posts/1'),
            fetchJson('https://jsonplaceholder.typicode.com/users/1')
        ]);

         
        const { title, body } = data1;
        const { name, email } = data2;

         
        print(`Post Title: ${title}\nAuthor: ${name}\nEmail: ${email}\nContent: ${body}`);

         
        const emailSet = new Set([email]);
        const postMap = new Map([[title, body]]);

         
        const additionalEmails = [...emailSet, 'example@example.com'];

        print('Emails:', additionalEmails);
        print('Post Map:', [...postMap.entries()]);

    } catch (error) {
         
        console.error('An error occurred:', error?.message ?? 'Unknown error');
    }
})();
