 
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { parse } from 'url';
import EventEmitter from 'events';

 
class Logger extends EventEmitter {
    log(message) {
        print(`Logged: ${message}`);
        this.emit('messageLogged', { id: Date.now(), message });
    }
}

 
async function getConfig() {
    try {
        const data = await readFile('./config.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading config:', err);
    }
}

 
const server = createServer(async (req, res) => {
    const logger = new Logger();
    logger.on('messageLogged', (arg) => print('Listener called:', arg));

    const { pathname } = parse(req.url, true);

     
    const config = await getConfig();
    const greetingMessage = config?.greetingMessage ?? 'Welcome to the server!';

    if (pathname === '/log') {
        logger.log('User accessed /log');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Logging complete!');
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(greetingMessage);
    }
});

 
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => print(`Server running on port ${PORT}`));

Note: This code demonstrates using advanced JavaScript features including ES6 modules, async/await for asynchronous operations, classes, event emitters, optional chaining, nullish coalescing, and template literals. Remember to have a `config.json` file in the same directory to see the full effect of the server greeting message.