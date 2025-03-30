 
import { createServer } from 'http';
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import EventEmitter from 'events';

 
const config = { server: { port: 8080 } };
const port = config.server?.port ?? 3000;

 
const myEmitter = new EventEmitter();

 
(async () => {
    try {
         
        const data = await fsPromises.readFile(join(__dirname, 'data.txt'), 'utf8');
        
         
        const processedData = data
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => line.toUpperCase());
        
        myEmitter.on('dataProcessed', (message) => {
            print('Event received:', message);
        });

         
        const server = createServer((req, res) => {
            if (req.method === 'GET' && req.url === '/') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(processedData.join('\n'));
                myEmitter.emit('dataProcessed', 'Data was sent to the client');
            }
        });

         
        await Promise.all([
            new Promise((resolve, reject) => server.listen(port, resolve)),
            fsPromises.writeFile(join(__dirname, 'output.txt'), processedData.join('\n'))
        ]);

        console.log(`Server running on http: 
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
