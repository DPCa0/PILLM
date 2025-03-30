 

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const processUserData = async () => {
    const usersUrl = 'https://jsonplaceholder.typicode.com/users';
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
    
    const [users, posts] = await Promise.all([fetchData(usersUrl), fetchData(postsUrl)]);

     
    const userMap = new Map();
    users.forEach(({ id, name, email }) => {
        userMap.set(id, { name, email, posts: [] });
    });

    posts.forEach(({ userId, title }) => {
        if (userMap.has(userId)) {
            userMap.get(userId).posts.push(title);
        }
    });

     
    const uniqueEmails = [...new Set(users.map(({ email }) => email))];

    print('Unique Emails:', uniqueEmails);

     
    userMap.forEach(({ name, email, posts }, userId) => {
        print(`User: ${name} (${email})`);
        print('Posts:', posts);
    });
};

processUserData();
