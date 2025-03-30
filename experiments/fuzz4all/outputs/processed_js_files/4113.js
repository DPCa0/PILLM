(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    const data = await response.json();
    return data;
  };

  const processData = async () => {
    try {
      const data = await fetchData('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
      const latestCommit = data[0];

      const {
        author: { login },
        commit: { message, author: { date } }
      } = latestCommit;

      print(`Latest commit by ${login}`);
      print(`Message: ${message}`);
      print(`Date: ${new Date(date).toLocaleString()}`);
      
      await delay(2000);
      print('This message is shown after a 2 second delay');

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  processData();
})();
