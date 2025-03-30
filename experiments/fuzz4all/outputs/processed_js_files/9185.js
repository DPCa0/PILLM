 
(async () => {
   
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

   
  const processUserData = ({ name: { first, last }, email }) =>
    `User: ${first} ${last}, Email: ${email}`;

   
  const apiUrl = 'https://randomuser.me/api/?results=5';
  const data = await fetchData(apiUrl);

  if (data && data.results) {
     
    const userInfos = data.results.map((user) => processUserData(user));
    
     
    const uniqueEmails = new Set(data.results.map((user) => user.email));

    print('User Infos:', userInfos);
    print('Unique Emails:', [...uniqueEmails]);
  }
})();
