const websocket = require('ws');

const ws = new websocket.Server({port: 8080});

const fs = require('fs');

ws.on("connection", socket => {
	// console.log(socket);
	fs.writeFile(new Date().getTime() + 'log.json', JSON.stringify(socket), (err) => {
		if(!err) console.log('ok');
		else console.log(err);
	});
    socket.on("message", message => {
    	message = JSON.parse(message);
        let data = {};
        data.errCode = 0;
        data.msg = message.msg;
        data.uid = message.uid;
        socket.send(JSON.stringify(data));
    })
})