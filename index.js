const express = require('express');
const app = express();
const PORT = 5000;

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendEvent = (data) => {
        const msg = `data: ${JSON.stringify(data)} - ${new Date().toTimeString()}\n\n`
        console.log(msg)
        res.write(msg);
    };

    const interval = setInterval(() => {
        sendEvent({ message: 'Hello, SSE!' });
    }, 1000);

    req.on('close', () => {
        clearInterval(interval);
        res.end();
    });
});

app.get('/', (req, res) => {
    res.send('SSE server is running. Connect to /events for updates.');
});

app.listen(PORT, () => {
    console.log(`SSE server running on http://localhost:${PORT}`);
});