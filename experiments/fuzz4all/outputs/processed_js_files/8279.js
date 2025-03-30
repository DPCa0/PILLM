 
async function fetchAndProcessData(url) {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    
     
    const processedData = data.items.map(({ id, name, attributes }) => {
       
      return {
        id,
        name: name.toUpperCase(),
        attributes: { ...attributes, isActive: true },
        tags: attributes.tags?.filter(tag => tag.startsWith('js')) ?? [],
      };
    });

     
    const uniqueTags = [...new Set(processedData.flatMap(item => item.tags))];

     
    const tagCounts = uniqueTags.reduce((acc, tag) => {
      acc[tag] = processedData.filter(item => item.tags.includes(tag)).length;
      return acc;
    }, {});

    print('Processed Data:', processedData);
    print('Unique Tags:', uniqueTags);
    print('Tag Counts:', tagCounts);

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

 
fetchAndProcessData('https://api.example.com/data');
