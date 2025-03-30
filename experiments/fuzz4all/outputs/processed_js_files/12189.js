 
async function* fetchData() {
  for (let i = 0; i < 5; i++) {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield `Data chunk ${i + 1}`;
  }
}

 
async function processData() {
   
  const results = await Promise.allSettled([
    fetch('https://jsonplaceholder.typicode.com/posts/1').then(res => res.json()),
    fetch('https://jsonplaceholder.typicode.com/posts/2').then(res => res.json())
  ]);

   
  const [firstPost, secondPost] = results.map(result => result.status === 'fulfilled' ? result.value : null);

  print('First Post:', firstPost);
  print('Second Post:', secondPost);

   
  const userMap = new Map();
  const uniqueId = Symbol('id');

  userMap.set(uniqueId, { name: 'Alice', age: 30 });

  print('User with unique ID:', userMap.get(uniqueId));

   
  for await (const chunk of fetchData()) {
    print('Received:', chunk);
  }

   
  const unknownUser = null;
  print('Unknown User Name:', unknownUser?.name ?? 'Default Name');
}

 
processData();
