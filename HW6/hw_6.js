const socket = require('socket.io');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);
    readStream.pipe(res)
});

// создаем сокет и передаем ему конект
const io = socket(server)

// массив для учета количества подключенных пользователей
let allClients = [];

io.on('connection', (client) => {
    client.on('client-msg', (data) => {
        const serverData = {
            username: data.username,
            message: data.message.split('').reverse().join(''),
        };
        // отправка сообщения всем подключеным клинетам
        client.broadcast.emit('server-msg', serverData)
        // отправка сообщения одному клиенту (себе)
        client.emit('server-msg', serverData);
    })
    client.once('connected', (data) => {

        allClients.push(data.username);

        const serverData = {
            username: data.username,
            allClients: allClients.length
        };

        client.broadcast.emit('connected', serverData)
        client.emit('connected', serverData);
    })


    client.on('disconnect', function(data) {
        console.log('Got disconnect!');

        const serverData = {
            username: data.username,
        };

        client.broadcast.emit('disconnected', serverData)
        client.emit('disconnected', serverData);
    })
});

server.listen(5555);
