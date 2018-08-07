import http from 'http';
import app from '../app.js';

const port = parseInt(process.env.PORT) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`listening on port ${port}`));