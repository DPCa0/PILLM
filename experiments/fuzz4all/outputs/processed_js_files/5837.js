 
import fetch from 'node-fetch';
import { promises as fs } from 'fs';

 
(async () => {
  try {
     
    const { URL: GITHUB_API, headers: { accept: JSON_MIME } } = {
      URL: 'https://api.github.com/repos/nodejs/node',
      headers: { accept: 'application/vnd.github.v3+json' }
    };

     
    const getRepoData = async (url, headers) => {
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    };

     
    const { stargazers_count, forks_count } = (await getRepoData(GITHUB_API, JSON_MIME)) ?? {};

     
    const { format } = await import('date-fns');
    const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

     
    const output = `
      Node.js GitHub Repository Statistics as of ${formattedDate}:
      🌟 Stars: ${stargazers_count ?? 'Unavailable'}
      🍴 Forks: ${forks_count ?? 'Unavailable'}
    `;

     
    await fs.writeFile('node_repo_stats.txt', output.trim());

    print('Statistics successfully saved to node_repo_stats.txt');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
