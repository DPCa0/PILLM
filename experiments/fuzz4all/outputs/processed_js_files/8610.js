 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
     
    const titles = data.map(post => post.title);
    
     
    const handler = {
      get: function(target, prop) {
        print(`Accessed property ${prop}`);
        return target[prop];
      }
    };

    const proxiedTitles = new Proxy(titles, handler);
    
     
    print(proxiedTitles.slice(0, 5));
    
     
    const uniqueWords = new Set(proxiedTitles.join(' ').split(' '));
    
     
    function* wordIterator() {
      for (const word of uniqueWords) {
        yield word;
      }
    }

     
    const uniqueWordsArray = [...wordIterator()];
    
    print('Unique Words:', uniqueWordsArray.slice(0, 10));

  } catch (error) {
     
    console.error('Fetching error:', error);
  }
})();
