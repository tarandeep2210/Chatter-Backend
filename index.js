const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// tech namespace
const tech = io.of('/tech');

tech.on('connection', (socket) => {
    console.log('user connected');
    tech.emit('new-message', 'user connected');
    // socket.on('message', (msg) => {
    //     console.log(`message: ${msg}`);
    //     io.emit('message', msg);
    // });
        socket.on('new-message', (message) => {
            console.log(message);
            tech.emit('new-message',message);
            });

        socket.on('disconnect', () => {
            console.log('user disconnected');
    
            tech.emit('new-message', 'user disconnected');
        });
    });

    

   

