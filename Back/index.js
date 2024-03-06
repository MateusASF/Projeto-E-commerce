const { response } = require('express');
const express = require('express');

const app = express();

app.get('/texto', (request, response) => {
    return response.send('Rodando o servidor com Node.js e Express!');
});

app.listen(3009, () => {
    console.log('Server is running on port 3006');
});