 
import fs from 'fs/promises';
import https from 'https';
import { promisify } from 'util';
import { pipeline } from 'stream';
import zlib from 'zlib';

 
const pipelineAsync = promisify(pipeline);

 
async function fetchDataAndProcess(url, outputFile) {
  try {
     
    const response = await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject(new Error(`Failed to get data, status code: ${res.statusCode}`));
        }
      }).on('error', reject);
    });

     
    const gunzip = zlib.createGunzip();

     
    const fileStream = await fs.open(outputFile, 'w');

     
    await pipelineAsync(response, gunzip, fileStream.createWriteStream());

    print(`Data from ${url} has been successfully fetched and processed to ${outputFile}`);
  } catch (error) {
    console.error('Error during fetch or processing:', error);
  }
}

 
const url = 'https://example.com/data.json.gz';

 
const outputFile = 'output.json';

 
fetchDataAndProcess(url, outputFile);
