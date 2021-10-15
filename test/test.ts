import { connect } from 'net';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */

const net = connect({ host: '0.0.0.0', port: 4001 }, () => {
    net.on('data', data => {
        console.log('net connect', data.toString());
    });
    net.write(Buffer.from(JSON.stringify({ aaa: 111 })));
});
