 
const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

 
async function complexOperation() {
  try {
    const apiResponses = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json())
    ]);

     
    const [posts, comments] = apiResponses;

     
    const userIds = new Set(posts.map(post => post.userId));
    const commentEmails = comments.map(comment => comment.email);
    const uniqueCommentEmails = new Set(commentEmails);

     
    function* userIdGenerator() {
      for (let userId of userIds) {
        yield userId;
      }
    }

    const userGen = userIdGenerator();

     
    const userIdsProxy = new Proxy(userIds, {
      get(target, prop, receiver) {
        print(`Getting property ${prop}`);
        return Reflect.get(target, prop, receiver);
      },
      has(target, key) {
        print(`Checking existence of ${key}`);
        return Reflect.has(target, key);
      }
    });

     
    for await (const userId of userGen) {
      print(`Processing User ID: ${userId}`);
      await delay();  
    }

    print('Unique User IDs:', [...userIdsProxy]);
    print('Unique Comment Emails:', [...uniqueCommentEmails]);

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

complexOperation();
