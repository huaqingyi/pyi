import { IncomingMessage, ServerResponse } from 'http';
import { StringDecoder } from 'string_decoder';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
export function parserHeader(head) {
    let lines = head.split(/\r\n/);
    let start = lines.shift();
    let method = start.split(' ')[0];
    let url = start.split(' ')[1];
    let httpVersion = start.split(' ')[2].split('/')[1];
    let headers = {};
    lines.forEach(line => {
        let row = line.split(': ');
        headers[row[0]] = row[1];
    });
    return { url, method, httpVersion, headers };
}

export function parser(socket, callback) {
    let buffers: Buffer[] = [];
    let sd = new StringDecoder();
    let im = new IncomingMessage(socket);
    function fn() {
        // let res = { write: socket.write.bind(socket), end: socket.end.bind(socket) }
        let res = {
            ...new ServerResponse(im),
            write: socket.write.bind(socket), 
            end: socket.end.bind(socket),
        };
        let content = socket.read();
        buffers.push(content);
        let str = sd.write(Buffer.concat(buffers));
        if (str.match(/\r\n\r\n/)) {
            let result = str.split('\r\n\r\n');
            let head = parserHeader(result[0]);
            // im = {...im,...head}
            Object.assign(im, head);
            socket.removeListener('readable', fn);
            socket.unshift(Buffer.from(result[1]));
            if (result[1]) {
                socket.on('data', function (data) {
                    im.push(data);
                    im.push(null);
                    callback(im, res);
                });
            } else {
                im.push(null);
                callback(im, new ServerResponse(im));
            }
        }
    }
    socket.on('readable', fn);
}
