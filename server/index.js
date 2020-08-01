const websocket = require('ws');

const ws = new websocket.Server({port: 10000});

const fs = require('fs');

const conns = [];

ws.on("connection", socket => {
    // console.log(socket);
    conns.push(socket);
    socket.on("message", message => {
    	message = JSON.parse(message);
        let data = {};
        data.errCode = 0;
        data.msg = message.msg;
        data.uid = message.uid;
        data.username = message.username;
        conns.forEach((socket, index) => {
            try {
                socket.send(JSON.stringify(data))
            } catch (error) {
                conns.splice(index, 1)
            }
        });
    })
})
