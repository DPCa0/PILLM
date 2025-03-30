 
import fetch from 'node-fetch';
import { promises as fs } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { createGzip } from 'zlib';

const pipe = promisify(pipeline);

 
(async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

     
    const [{ title, body }] = data;

     
    const highlight = (strings, ...values) =>
      strings.reduce((acc, str, i) => acc + str + (values[i] ? `**${values[i]}**` : ''), '');

    print(highlight`Post Title: ${title}`);
    print(highlight`Post Body: ${body}`);

     
    await fs.writeFile('posts.json', JSON.stringify(data, null, 2));

     
    const source = await fs.open('posts.json', 'r');
    const destination = await fs.open('posts.json.gz', 'w');

    await pipe(
      source.createReadStream(),
      createGzip(),
      destination.createWriteStream()
    );

    print('Data has been fetched, saved, and compressed.');

  } catch (error) {
    console.error('Error:', error);
  }
})();
