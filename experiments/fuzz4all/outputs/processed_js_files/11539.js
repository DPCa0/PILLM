 
async function fetchData() {
  try {
     
    const response = await fetch(`https: 
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

     
    const titlesWithId = data
      .filter((post) => post.userId === 1)
      .map(({ id, title }) => ({ id, title }));

     
    const uniqueTitles = [...new Set(titlesWithId.map((item) => item.title))];

     
    uniqueTitles.forEach((title, index) => {
      const { id } = titlesWithId.find(({ title: t }) => t === title) ?? {};
      print(`Post ${index + 1}: ${title} (ID: ${id ?? 'N/A'})`);
    });
  } catch (error) {
     
    console.error('Failed to fetch data:', error);
  }
}

 
(async () => {
  await fetchData();
})();
