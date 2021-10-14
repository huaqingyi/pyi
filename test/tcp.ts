/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import { Socket } from 'net';
import { createServer } from 'http';

const app = createServer();

app.on('connection', socket => {
    console.log('connection');
});

app.on('request', (req, res) => {
    console.log('request');
    res.end('hello ...');
});

app.on('clientError', (err: Error & any, socket: Socket) => {
    // console.log('clientError', err.rawPacket.toString());
    socket.on('close', () => {
        console.log('tcp closed');
    });
    const packet = err.rawPacket;
    socket.write(packet);
});

app.listen(3000);
