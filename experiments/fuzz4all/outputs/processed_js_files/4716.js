 
 

const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, title: 'JavaScript Advanced', tags: ['es6', 'async', 'destructuring'] };
      resolve(data);
    }, 1000);
  });
};

const processTags = (...tags) => {
  return tags.map(tag => tag.toUpperCase());
};

(async () => {
  try {
    const { title, tags } = await fetchData();
    print(`Fetched Article: ${title}`);
    
    const processedTags = processTags(...tags);
    print('Processed Tags:', processedTags);

    const advancedFeatures = {
      [Symbol('feature')]: 'Advanced Programming',
      asyncFeature() {
        return 'Using async functions';
      }
    };
    
    for (let key in advancedFeatures) {
      print(`${key}: ${advancedFeatures[key]}`);
    }
    
    print(await advancedFeatures.asyncFeature());
  } catch (error) {
    console.error('Error:', error);
  }
})();
