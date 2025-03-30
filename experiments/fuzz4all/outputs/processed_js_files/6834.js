 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['JavaScript', 'Python', 'C++', 'Java']);
    }, 2000);
  });
};

 
async function displayLanguages() {
  try {
    print('Fetching programming languages...');
    
     
    const languages = await fetchData();
    
     
    languages.map(language => {
      print(`- Language: ${language}`);
    });

     
    const [first, second, ...rest] = languages;
    print(`First two languages are: ${first} and ${second}`);
    
     
    const extendedLanguages = [...languages, 'Rust'];
    print('Extended language list:', extendedLanguages.join(', '));
    
  } catch (error) {
    console.error('Error fetching languages:', error);
  }
}

 
(async () => {
  await displayLanguages();
})();
